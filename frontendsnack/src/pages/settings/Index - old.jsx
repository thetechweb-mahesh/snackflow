import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";


export default function Index() {

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState({
            name: "",
            phone: "",
            email: "",
            address: "",
        });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {

        try {

            const res =
                await api.get(
                    "/settings"
                );

            setForm(res.data);

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

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.put(
                "/settings",
                form
            );

            alert(
                "Settings Updated"
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    return (
        <DashboardLayout>

            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-xl shadow p-6">

                    <h1 className="text-2xl font-bold mb-6">
                        Shop Settings
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <div>

                            <label>
                                Shop Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name || ""}
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <div>

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={form.phone || ""}
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <div>

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email || ""}
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <div>

                            <label>
                                Address
                            </label>

                            <textarea
                                rows="3"
                                name="address"
                                value={
                                    form.address || ""
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Settings"}
                        </button>

                    </form>

                </div>

                {/* QR Menu Section */}

                <div className="bg-white rounded-xl shadow p-6 mt-6">

                    <h2 className="text-xl font-bold mb-4">
                        QR Menu Link
                    </h2>

                    <div className="bg-gray-100 p-3 rounded-lg">

                        {window.location.origin}
                        /menu/
                        {form.slug}

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                        Customers can scan QR
                        and view your menu.
                    </p>

                </div>

            </div>

        </DashboardLayout>
    );
}