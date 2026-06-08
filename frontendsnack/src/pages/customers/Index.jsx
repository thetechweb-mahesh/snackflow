import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Index() {

    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {

        try {

            const res = await api.get(
                "/customers"
            );

            setCustomers(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });

    };

    const saveCustomer = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await api.put(
                    `/customers/${editingId}`,
                    form
                );

            } else {

                await api.post(
                    "/customers",
                    form
                );

            }

            resetForm();

            fetchCustomers();

        } catch (error) {

            console.log(error);

        }
    };

    const editCustomer = (customer) => {

        setEditingId(customer.id);

        setForm({
            name: customer.name || "",
            phone: customer.phone || "",
            email: customer.email || "",
            address: customer.address || "",
        });

    };

    const deleteCustomer = async (id) => {

        if (
            !window.confirm(
                "Delete customer?"
            )
        ) {
            return;
        }

        try {

            await api.delete(
                `/customers/${id}`
            );

            fetchCustomers();

        } catch (error) {

            console.log(error);

        }
    };

    const resetForm = () => {

        setEditingId(null);

        setForm({
            name: "",
            phone: "",
            email: "",
            address: "",
        });

    };

    return (
        <DashboardLayout>

            <div className="space-y-6">

                <div>

                    <h1 className="text-2xl font-bold">
                        Customers
                    </h1>

                    <p className="text-gray-500">
                        Manage your customers
                    </p>

                </div>

                {/* Form */}

                <div className="bg-white rounded-xl shadow p-6">

                    <form
                        onSubmit={saveCustomer}
                        className="grid md:grid-cols-2 gap-4"
                    >

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Customer Name"
                            className="border rounded-lg px-4 py-2"
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="border rounded-lg px-4 py-2"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border rounded-lg px-4 py-2"
                        />

                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Address"
                            className="border rounded-lg px-4 py-2"
                        />

                        <div className="md:col-span-2 flex gap-2">

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                            >
                                {editingId
                                    ? "Update Customer"
                                    : "Add Customer"}
                            </button>

                            {editingId && (

                                <button
                                    type="button"
                                    onClick={
                                        resetForm
                                    }
                                    className="bg-gray-500 text-white px-5 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>

                            )}

                        </div>

                    </form>

                </div>

                {/* Table */}

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead>

                            <tr className="bg-gray-50 border-b">

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Phone
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {customers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        No customers found
                                    </td>

                                </tr>

                            ) : (

                                customers.map(
                                    (customer) => (

                                        <tr
                                            key={
                                                customer.id
                                            }
                                            className="border-b"
                                        >

                                            <td className="p-4">
                                                {
                                                    customer.name
                                                }
                                            </td>

                                            <td className="p-4">
                                                {
                                                    customer.phone
                                                }
                                            </td>

                                            <td className="p-4">
                                                {
                                                    customer.email
                                                }
                                            </td>

                                            <td className="p-4 flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        editCustomer(
                                                            customer
                                                        )
                                                    }
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteCustomer(
                                                            customer.id
                                                        )
                                                    }
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
<button
    onClick={() =>
        navigate(
            `/customers/${customer.id}`
        )
    }
    className="bg-green-600 text-white px-3 py-1 rounded"
>
    View
</button>
                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );
}