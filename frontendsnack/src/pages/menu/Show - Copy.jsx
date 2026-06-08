import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function Show() {

    const { slug } = useParams();

    const [loading, setLoading] =
        useState(true);

    const [data, setData] =
        useState(null);

    useEffect(() => {

        fetchMenu();

    }, [slug]);

    const fetchMenu = async () => {

        try {

            const res = await api.get(
                `/menu/${slug}`
            );

            setData(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Menu...
            </div>
        );
    }

    if (!data) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Menu not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Shop Header */}

            <div className="bg-white shadow">

                <div className="max-w-5xl mx-auto p-6">

                    {data.shop.logo && (

                        <img
                            src={data.shop.logo}
                            alt={data.shop.name}
                            className="w-24 h-24 rounded-full object-cover mb-4"
                        />

                    )}

                    <h1 className="text-3xl font-bold">
                        {data.shop.name}
                    </h1>

                    {data.shop.phone && (

                        <p className="text-gray-600 mt-2">
                            📞 {data.shop.phone}
                        </p>

                    )}

                    {data.shop.address && (

                        <p className="text-gray-600">
                            📍 {data.shop.address}
                        </p>

                    )}

                </div>

            </div>

            {/* Categories */}

            <div className="max-w-5xl mx-auto p-4">

                {data.categories.length === 0 ? (

                    <div className="bg-white rounded-xl p-6 text-center">

                        No Menu Available

                    </div>

                ) : (

                    data.categories.map(
                        (category) => (

                            <div
                                key={category.id}
                                className="bg-white rounded-xl shadow mb-6 overflow-hidden"
                            >

                                <div className="bg-slate-900 text-white px-5 py-3">

                                    <h2 className="text-xl font-bold">
                                        {category.name}
                                    </h2>

                                </div>

                                <div>

                                    {category.items.length === 0 ? (

                                        <div className="p-4 text-gray-500">
                                            No Items
                                        </div>

                                    ) : (

                                        category.items.map(
                                            (item) => (

                                                <div
                                                    key={item.id}
                                                    className="flex justify-between items-center p-4 border-b"
                                                >

                                                    <div>

                                                        <h3 className="font-semibold">
                                                            {item.name}
                                                        </h3>

                                                    </div>

                                                    <div className="font-bold text-lg">

                                                        ₹{item.price}

                                                    </div>

                                                </div>

                                            )
                                        )

                                    )}

                                </div>

                            </div>

                        )
                    )

                )}

            </div>

        </div>
    );
}