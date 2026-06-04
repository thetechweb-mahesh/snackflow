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
        <div className="max-w-md mx-auto mt-10">

            <h1 className="text-2xl font-bold mb-5">
                Create Shop
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Shop Name"
                    className="border p-2 w-full mb-3"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            shop_name: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Owner Name"
                    className="border p-2 w-full mb-3"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                />

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

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border p-2 w-full mb-3"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password_confirmation:
                                e.target.value
                        })
                    }
                />

                <button
                    className="bg-black text-white px-4 py-2"
                >
                    Register
                </button>

            </form>
        </div>
    );
}