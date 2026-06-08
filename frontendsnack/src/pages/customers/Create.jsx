import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Create() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post(
                "/customers",
                form
            );

            navigate("/customers");

        } catch (error) {

            console.log(error);

            alert(
                "Failed to create customer"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <DashboardLayout>

            <div className="max-w-3xl mx-auto">

                <div className="bg-white rounded-xl shadow p-6">

                    <h1 className="text-2xl font-bold mb-6">
                        Add Customer
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <div>

                            <label className="block mb-1">
                                Customer Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                                required
                            />

                        </div>

                        <div>

                            <label className="block mb-1">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                                required
                            />

                        </div>

                        <div>

                            <label className="block mb-1">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <div>

                            <label className="block mb-1">
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={
                                    form.address
                                }
                                onChange={
                                    handleChange
                                }
                                rows="3"
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <div className="flex gap-3">

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                            >
                                {loading
                                    ? "Saving..."
                                    : "Save Customer"}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/customers"
                                    )
                                }
                                className="bg-gray-500 text-white px-5 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>
    );
}