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
        <div className="max-w-md mx-auto mt-10">

            <h1 className="text-2xl font-bold mb-5">
                Login
            </h1>

            <form onSubmit={login}>

                <input
                    placeholder="Email"
                    className="border p-2 w-full mb-3"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-3"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }
                />

                <button
                    className="bg-black text-white px-4 py-2"
                >
                    Login
                </button>

            </form>
        </div>
    );
}