import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Items() {

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        category_id: "",
        name: "",
        price: "",
        cost_price: "",
    });

    useEffect(() => {
        fetchCategories();
        fetchItems();
    }, []);

    const fetchCategories = async () => {
        const res = await api.get("/categories");
        setCategories(res.data);
    };

    const fetchItems = async () => {
        const res = await api.get("/items");
        setItems(res.data);
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (editingId) {

            await api.put(`/items/${editingId}`, form);

        } else {

            await api.post("/items", form);

        }

        setForm({
            category_id: "",
            name: "",
            price: "",
            cost_price: "",
        });

        setEditingId(null);

        fetchItems();

    } catch (error) {

        console.log(error);

    }
};
const editItem = (item) => {

    setEditingId(item.id);

    setForm({
        category_id: item.category_id,
        name: item.name,
        price: item.price,
        cost_price: item.cost_price || "",
    });
};

    const deleteItem = async (id) => {

    if (!window.confirm("Delete item?")) {
        return;
    }

    try {

        await api.delete(`/items/${id}`);

        fetchItems();

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
                        Add Item
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <select
                            value={form.category_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    category_id: e.target.value,
                                })
                            }
                            className="border w-full p-3 rounded-lg mb-3"
                        >
                            <option value="">
                                Select Category
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <input
                            placeholder="Item Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            className="border w-full p-3 rounded-lg mb-3"
                        />

                        <input
                            placeholder="Selling Price"
                            value={form.price}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    price: e.target.value,
                                })
                            }
                            className="border w-full p-3 rounded-lg mb-3"
                        />

                        <input
                            placeholder="Cost Price"
                            value={form.cost_price}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    cost_price: e.target.value,
                                })
                            }
                            className="border w-full p-3 rounded-lg mb-3"
                        />

                        <button
                            className="bg-blue-600 text-white w-full py-3 rounded-lg"
                        >
                            Save Item
                        </button>

                    </form>

                </div>

                {/* Item List */}

                <div className="lg:col-span-2 bg-white rounded-xl shadow">

                    <div className="p-4 border-b">

                        <h2 className="font-bold text-lg">
                            Items
                        </h2>

                    </div>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Category
                                </th>

                                <th className="p-4 text-left">
                                    Price
                                </th>
                                  <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {items.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {item.name}
                                    </td>

                                    <td className="p-4">
                                        {item.category?.name}
                                    </td>

                                    <td className="p-4">
                                        ₹{item.price}
                                    </td>
                                                        <td className="p-4 flex gap-2">

                                        <button
                                            onClick={() => editItem(item)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => deleteItem(item.id)}
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