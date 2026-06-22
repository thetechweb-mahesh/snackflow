import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

export default function ShopLanding() {

    const { slug } = useParams();

    const [shop, setShop] = useState(null);

    useEffect(() => {
        fetchShop();
    }, []);

    const fetchShop = async () => {

        try {

            const res = await api.get(
                `/public-shop/${slug}`
            );

            setShop(res.data);

        } catch (err) {

            console.log(err);

        }
    };

    if (!shop) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Hero */}

            <div className="bg-white shadow">

                <div className="max-w-5xl mx-auto px-6 py-10">

                    <div className="flex flex-col items-center">

                        <img
                            src={
                                shop.logo
                                    ? shop.logo
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvlMwtiKQDHraYzHvC62eytuTaywuzF4lcrjU6nDzFD1sogja_OPDXj2E&s=10"
                            }
                            alt={shop.name}
                            className="w-28 h-28 rounded-full border object-cover"
                        />

                        <h1 className="text-4xl font-bold mt-4">
                            {shop.name}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Welcome to our restaurant
                        </p>

                    </div>

                </div>

            </div>

            {/* Details */}

            <div className="max-w-5xl mx-auto p-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Contact Information
                    </h2>

                    <div className="space-y-3">

                        <p>
                            📞 {shop.phone || "Not Available"}
                        </p>

                        <p>
                            📧 {shop.email || "Not Available"}
                        </p>

                        <p>
                            📍 {shop.address || "Not Available"}
                        </p>

                    </div>

                </div>

                {/* About */}

                <div className="bg-white rounded-xl shadow p-6 mt-6">

                    <h2 className="text-xl font-semibold mb-4">
                        About Us
                    </h2>

                    <p className="text-gray-600">
                        Welcome to {shop.name}. We serve
                        delicious food with great taste
                        and quality. Explore our menu
                        and place your order today.
                    </p>

                </div>

                {/* CTA */}

                <div className="text-center mt-8">

                    <Link
                        to={`/menu/${shop.slug}`}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg"
                    >
                        View Menu
                    </Link>

                </div>

            </div>

        </div>
    );
}