import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function Show() {

    const { slug } = useParams();

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(null);

    const [cart, setCart] = useState([]);

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

    const addToCart = (item) => {

        const existing = cart.find(
            c => c.id === item.id
        );

        if (existing) {

            setCart(
                cart.map(c =>
                    c.id === item.id
                        ? {
                              ...c,
                              qty: c.qty + 1
                          }
                        : c
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    ...item,
                    qty: 1
                }
            ]);

        }
    };

    const decreaseQty = (id) => {

    setCart(
        cart
            .map(item =>
                item.id === id
                    ? {
                          ...item,
                          qty: item.qty - 1
                      }
                    : item
            )
            .filter(item => item.qty > 0)
    );
};
const removeItem = (id) => {

    setCart(
        cart.filter(
            item => item.id !== id
        )
    );
};

    const total = cart.reduce(
        (sum, item) =>
            sum + (item.price * item.qty),
        0
    );


//
const sendWhatsApp = () => {

    const orderText =
        cart
        .map(item =>
            `${item.name} x ${item.qty}`
        )
        .join("\n");

    const message = encodeURIComponent(
`Hello ${data.shop.name}

Order:

${orderText}

Total: ₹${total}`
    );

    window.open(
        `https://wa.me/${data.shop.phone}?text=${message}`,
        "_blank"
    );
};

//





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

            data.categories.map((category) => (

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

                            category.items.map((item) => (

                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-4 border-b"
                                >

                                    <div>

                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span className="font-bold text-lg">
                                            ₹{item.price}
                                        </span>

                                        <button
                                            onClick={() => addToCart(item)}
                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Add
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            ))

        )}

        {/* CART SECTION - MAP KE BAHAR */}

        <div className="bg-white rounded-xl shadow p-4 mt-6">

            <h2 className="font-bold text-xl mb-4">
                Cart
            </h2>

            {cart.length === 0 ? (

                <p className="text-gray-500">
                    Cart is empty
                </p>

            ) : (

                <>
                    {cart.map((item) => (

                        <div
                            key={item.id}
                            className="flex justify-between items-center border-b py-3"
                        >

                            <div>

                                <h3 className="font-semibold">
                                    {item.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    ₹{item.price} × {item.qty}
                                </p>

                            </div>

                            <div className="flex items-center gap-2">

                                <button
                                    onClick={() => decreaseQty(item.id)}
                                    className="bg-gray-200 px-3 py-1 rounded"
                                >
                                    −
                                </button>

                                <span className="font-bold">
                                    {item.qty}
                                </span>

                                <button
                                    onClick={() => addToCart(item)}
                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                >
                                    +
                                </button>

                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                    <div className="mt-4 border-t pt-4">

                        <h3 className="text-xl font-bold">
                            Total ₹{total}
                        </h3>

                    </div>
<button
    onClick={sendWhatsApp}
    className="bg-green-600 text-white px-4 py-3 rounded-lg w-full mt-4"
>
    Order on WhatsApp
</button>
                </>

            )}

        </div>

    </div>

</div>
    );
}