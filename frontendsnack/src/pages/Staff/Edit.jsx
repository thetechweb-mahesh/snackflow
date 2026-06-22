import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Edit() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const fetchStaff = async () => {

        try {

            const res = await api.get(
                `/staff/${id}`
            );

            setForm({
                name: res.data.name,
                email: res.data.email,
                password: "",
                password_confirmation: "",
            });

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        fetchStaff();

    }, []);

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

            await api.put(
                `/staff/${id}`,
                form
            );

            alert(
                "Staff Updated Successfully"
            );

            navigate("/staff");

        } catch (error) {

            console.log(
                error.response?.data
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
                        Edit Staff
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
                                New Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3"
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
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                        >
                            {loading
                                ? "Updating..."
                                : "Update Staff"}
                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>
    );
}