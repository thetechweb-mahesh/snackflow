import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function POS() {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);

    const [selectedCategory, setSelectedCategory] =
        useState(null);

    const [paymentMethod, setPaymentMethod] =
        useState("cash");

    useEffect(() => {
        fetchCategories();
        fetchItems();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories");
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchItems = async () => {
        try {
            const res = await api.get("/items");
            setItems(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredItems = selectedCategory
        ? items.filter(
              (item) =>
                  item.category_id === selectedCategory
          )
        : items;

    const addToCart = (item) => {
        const existing = cart.find(
            (c) => c.id === item.id
        );

        if (existing) {
            setCart(
                cart.map((c) =>
                    c.id === item.id
                        ? {
                              ...c,
                              qty: c.qty + 1,
                          }
                        : c
                )
            );
        } else {
            setCart([
                ...cart,
                {
                    ...item,
                    qty: 1,
                },
            ]);
        }
    };

    const increaseQty = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          qty: item.qty + 1,
                      }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCart(
            cart
                .map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              qty: item.qty - 1,
                          }
                        : item
                )
                .filter((item) => item.qty > 0)
        );
    };

    const removeItem = (id) => {
        setCart(
            cart.filter(
                (item) => item.id !== id
            )
        );
    };

    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
                Number(item.qty),
        0
    );

    return (
        <DashboardLayout>

            <div className="grid grid-cols-12 gap-4">

                {/* Categories */}

                <div className="col-span-2 bg-white rounded-xl p-4">

                    <h2 className="font-bold mb-4">
                        Categories
                    </h2>

                    <button
                        onClick={() =>
                            setSelectedCategory(null)
                        }
                        className="w-full p-2 mb-2 bg-gray-100 rounded"
                    >
                        All
                    </button>

                    {categories.map((category) => (

                        <button
                            key={category.id}
                            onClick={() =>
                                setSelectedCategory(
                                    category.id
                                )
                            }
                            className="w-full p-2 mb-2 border rounded"
                        >
                            {category.name}
                        </button>

                    ))}

                </div>

                {/* Items */}

                <div className="col-span-6 bg-white rounded-xl p-4">

                    <h2 className="font-bold mb-4">
                        Items
                    </h2>

                    <div className="grid grid-cols-3 gap-3">

                        {filteredItems.map((item) => (

                            <button
                                key={item.id}
                                onClick={() =>
                                    addToCart(item)
                                }
                                className="border rounded-xl p-4 hover:bg-blue-50"
                            >

                                <h3 className="font-semibold">
                                    {item.name}
                                </h3>

                                <p>
                                    ₹{item.price}
                                </p>

                            </button>

                        ))}

                    </div>

                </div>

                {/* Cart */}

                <div className="col-span-4 bg-white rounded-xl p-4">

                    <h2 className="font-bold mb-4">
                        Cart
                    </h2>

                    {cart.length === 0 && (
                        <p>
                            No items added
                        </p>
                    )}

                    {cart.map((item) => (

                        <div
                            key={item.id}
                            className="border-b py-3"
                        >

                            <div className="flex justify-between">

                                <strong>
                                    {item.name}
                                </strong>

                                <button
                                    onClick={() =>
                                        removeItem(
                                            item.id
                                        )
                                    }
                                    className="text-red-500"
                                >
                                    X
                                </button>

                            </div>

                            <div className="flex items-center justify-between mt-2">

                                <div className="flex gap-2">

                                    <button
                                        onClick={() =>
                                            decreaseQty(
                                                item.id
                                            )
                                        }
                                        className="px-2 bg-gray-200 rounded"
                                    >
                                        -
                                    </button>

                                    <span>
                                        {item.qty}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQty(
                                                item.id
                                            )
                                        }
                                        className="px-2 bg-gray-200 rounded"
                                    >
                                        +
                                    </button>

                                </div>

                                <span>
                                    ₹
                                    {item.price *
                                        item.qty}
                                </span>

                            </div>

                        </div>

                    ))}

                    <div className="mt-4 border-t pt-4">

                        <h3 className="font-bold mb-2">
                            Payment Method
                        </h3>

                        <select
                            value={
                                paymentMethod
                            }
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                            className="border p-2 w-full rounded"
                        >
                            <option value="cash">
                                Cash
                            </option>

                            <option value="upi">
                                UPI
                            </option>
                        </select>

                        <div className="mt-4 text-xl font-bold">

                            Total ₹
                            {total.toFixed(2)}

                        </div>

                        <button
                            className="w-full bg-green-600 text-white py-3 rounded-xl mt-4"
                        >
                            Place Order
                        </button>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}