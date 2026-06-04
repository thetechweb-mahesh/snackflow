import { useState } from "react";
import api from "../../api/axios";

export default function Register() {

    const [form, setForm] = useState({
        shop_name: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await api.post("/register", form);

            alert("Registration Success");

            console.log(res.data);

        } catch (err) {

            console.log(err.response.data);

        }
    };

    return (
       <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
                Create Your Shop
            </h1>

            <p className="text-gray-500 mt-2">
                Start managing orders, billing & QR menus with SnackFlow
            </p>

        </div>

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shop Name
                </label>

                <input
                    type="text"
                    placeholder="e.g. Sharma Fast Food"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            shop_name: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Name
                </label>

                <input
                    type="text"
                    placeholder="Enter owner name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>

                <input
                    type="password"
                    placeholder="Create password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value,
                        })
                    }
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                </label>

                <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password_confirmation:
                                e.target.value,
                        })
                    }
                />
            </div>

            <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
                Create Shop
            </button>

        </form>

        <div className="text-center mt-6">

            <p className="text-gray-500 text-sm">
                Already have an account?
            </p>

            <a
                href="/login"
                className="text-orange-500 font-semibold hover:text-orange-600"
            >
                Login Here
            </a>

        </div>

    </div>

</div>
    );
}