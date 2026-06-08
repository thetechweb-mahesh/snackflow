import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Expenses() {

    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        expense_category_id: "",
        amount: "",
        expense_date: "",
        notes: "",
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    // GET Expenses
    const fetchExpenses = async () => {
        try {
            const res = await api.get("/expenses");
            setExpenses(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // GET Categories
    const fetchCategories = async () => {
        try {
            const res = await api.get("/expense-categories");
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // SUBMIT (CREATE + UPDATE)
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await api.put(`/expenses/${editingId}`, form);

            } else {

                await api.post("/expenses", form);
            }

            setForm({
                expense_category_id: "",
                amount: "",
                expense_date: "",
                notes: "",
            });

            setEditingId(null);

            fetchExpenses();

        } catch (error) {
            console.log(error);
        }
    };

    // EDIT
    const editExpense = (exp) => {

        setEditingId(exp.id);

        setForm({
            expense_category_id: exp.expense_category_id,
            amount: exp.amount,
            expense_date: exp.expense_date,
            notes: exp.notes || "",
        });
    };

    // DELETE
    const deleteExpense = async (id) => {

        if (!window.confirm("Delete expense?")) return;

        try {
            await api.delete(`/expenses/${id}`);
            fetchExpenses();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <DashboardLayout>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* FORM */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-bold mb-4">
                        Add Expense
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        {/* Category */}
                        <select
                            className="border w-full p-3 rounded-lg"
                            value={form.expense_category_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    expense_category_id: e.target.value
                                })
                            }
                        >
                            <option value="">Select Category</option>

                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {/* Amount */}
                        <input
                            type="number"
                            placeholder="Amount"
                            className="border w-full p-3 rounded-lg"
                            value={form.amount}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    amount: e.target.value
                                })
                            }
                        />

                        {/* Date */}
                        <input
                            type="date"
                            className="border w-full p-3 rounded-lg"
                            value={form.expense_date}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    expense_date: e.target.value
                                })
                            }
                        />

                        {/* Notes */}
                        <textarea
                            placeholder="Notes"
                            className="border w-full p-3 rounded-lg"
                            value={form.notes}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    notes: e.target.value
                                })
                            }
                        />

                        <button
                            className="bg-blue-600 text-white w-full py-3 rounded-lg"
                        >
                            Save Expense
                        </button>

                    </form>

                </div>

                {/* LIST */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow">

                    <div className="p-4 border-b">
                        <h2 className="font-bold text-lg">
                            Expenses
                        </h2>
                    </div>

                    <table className="w-full">

                        <thead>
                            <tr className="border-b">
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Amount</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {expenses.map((exp) => (
                                <tr key={exp.id} className="border-b">

                                    <td className="p-3">
                                        {exp.category?.name}
                                    </td>

                                    <td className="p-3">
                                        ₹{exp.amount}
                                    </td>

                                    <td className="p-3">
                                        {exp.expense_date}
                                    </td>

                                    <td className="p-3 flex gap-2">

                                        {/* <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button> */}
<button
    onClick={() => editExpense(exp)}
    className="bg-yellow-500 text-white px-3 py-1 rounded"
>
    Edit
</button>
                                        <button
                                            onClick={() => deleteExpense(exp.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );
}