import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Create() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const submit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await api.post(
                "/staff",
                form
            );

            alert(
                "Staff Created Successfully"
            );

            navigate("/staff");

        } catch (error) {

            console.log(
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <DashboardLayout>

            <div className="max-w-2xl mx-auto">

                <div className="bg-white rounded-xl shadow p-6">

                    <h1 className="text-2xl font-bold mb-6">
                        Add Staff
                    </h1>

                    <form onSubmit={submit}>

                        <div className="mb-4">

                            <label className="block mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="block mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                                required
                            />

                        </div>

                        <div className="mb-4">

                            <label className="block mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                                required
                            />

                        </div>

                        <div className="mb-6">

                            <label className="block mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="password_confirmation"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Staff"}
                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>
    );
}