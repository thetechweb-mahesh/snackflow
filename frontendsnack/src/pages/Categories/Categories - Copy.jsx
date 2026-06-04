import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);

    const fetchCategories = async () => {
        try {

            const res = await api.get(
                "/categories"
            );

            setCategories(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const addCategory = async (e) => {

        e.preventDefault();

        try {

            await api.post("/categories", {
                name,
            });

            setName("");

            fetchCategories();
              
        } catch (error) {

            console.log(error);

        }
    };

    const deleteCategory = async (id) => {

    if (!window.confirm("Delete category?")) {
        return;
    }

    try {

        await api.delete(
            `/categories/${id}`
        );

        fetchCategories();

    } catch (error) {

        console.log(error);

    }
};
    return (
        <DashboardLayout>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Form */}

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-bold mb-4">
                        Add Category
                    </h2>

                    <form onSubmit={addCategory}>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="Category Name"
                            className="border w-full p-3 rounded-lg mb-3"
                        />

                        <button
                            className="bg-blue-600 text-white w-full py-3 rounded-lg"
                        >
                            Save Category
                        </button>

                    </form>

                </div>

                {/* List */}

                <div className="lg:col-span-2 bg-white rounded-xl shadow">

                    <div className="p-4 border-b">

                        <h2 className="font-bold text-lg">
                            Categories
                        </h2>

                    </div>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="p-4 text-left">
                                    ID
                                </th>

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                 <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.map(
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

                                        <td className="p-4">
                                            Active
                                        </td>

                                        <td className="p-4 flex gap-2">

    <button
        onClick={() =>
            editCategory(category)
        }
        className="bg-yellow-500 text-white px-3 py-1 rounded"
    >
        Edit
    </button>

    <button
        onClick={() =>
            deleteCategory(category.id)
        }
        className="bg-red-500 text-white px-3 py-1 rounded"
    >
        Delete
    </button>

</td>
                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );
}