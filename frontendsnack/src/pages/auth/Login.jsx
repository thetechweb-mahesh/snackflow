import { useState } from "react";
import api from "../../api/axios";

export default function Login() {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const login = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post(
                "/login",
                form
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            window.location.href =
                "/dashboard";

        } catch (err) {

            console.log(err.response.data);

        }
    };

    return (
       <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
                SnackFlow POS
            </h1>

            <p className="text-gray-500 mt-2">
                Login to your account
            </p>

        </div>

        <form onSubmit={login} className="space-y-5">

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
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value,
                        })
                    }
                />

            </div>

            <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
                Login
            </button>

        </form>

        <div className="text-center mt-6">

            <p className="text-gray-500 text-sm">
                Don't have an account?
            </p>

            <a
                href="/register"
                className="text-orange-500 font-semibold hover:text-orange-600"
            >
                Create Account
            </a>

        </div>

    </div>

</div>
    );
}