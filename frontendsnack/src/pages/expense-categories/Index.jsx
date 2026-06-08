import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Index() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {

        try {

            const res = await api.get(
                "/expense-categories"
            );

            setCategories(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    const saveCategory = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await api.put(
                    `/expense-categories/${editingId}`,
                    {
                        name,
                    }
                );

            } else {

                await api.post(
                    "/expense-categories",
                    {
                        name,
                    }
                );
            }

            setName("");
            setEditingId(null);

            fetchCategories();

        } catch (error) {

            console.log(error);

        }
    };

    const editCategory = (category) => {

        setEditingId(category.id);
        setName(category.name);

    };

    const deleteCategory = async (id) => {

        if (
            !window.confirm(
                "Delete this category?"
            )
        ) {
            return;
        }

        try {

            await api.delete(
                `/expense-categories/${id}`
            );

            fetchCategories();

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <DashboardLayout>

            <div className="space-y-6">

                {/* Header */}

                <div>

                    <h1 className="text-2xl font-bold">
                        Expense Categories
                    </h1>

                    <p className="text-gray-500">
                        Manage expense categories
                    </p>

                </div>

                {/* Form */}

                <div className="bg-white rounded-xl shadow p-6">

                    <form
                        onSubmit={saveCategory}
                        className="flex gap-3"
                    >

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="Category Name"
                            className="border rounded-lg px-4 py-2 flex-1"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            {editingId
                                ? "Update"
                                : "Add"}
                        </button>

                    </form>

                </div>

                {/* Table */}

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead>

                            <tr className="bg-gray-50 border-b">

                                <th className="p-4 text-left">
                                    ID
                                </th>

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="3"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No categories found
                                    </td>

                                </tr>

                            ) : (

                                categories.map(
                                    (category) => (

                                        <tr
                                            key={
                                                category.id
                                            }
                                            className="border-b"
                                        >

                                            <td className="p-4">
                                                {
                                                    category.id
                                                }
                                            </td>

                                            <td className="p-4">
                                                {
                                                    category.name
                                                }
                                            </td>

                                            <td className="p-4 flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        editCategory(
                                                            category
                                                        )
                                                    }
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteCategory(
                                                            category.id
                                                        )
                                                    }
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
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