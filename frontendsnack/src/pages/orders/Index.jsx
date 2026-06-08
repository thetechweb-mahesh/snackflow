import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Index() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const res = await api.get(
                "/orders"
            );

            setOrders(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-2xl font-bold">
                        Orders
                    </h1>

                    <p className="text-gray-500">
                        Manage all orders
                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate("/orders/create")
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + New Order
                </button>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead>

                        <tr className="border-b bg-gray-50">

                            <th className="p-4 text-left">
                                Invoice
                            </th>

                            <th className="p-4 text-left">
                                Total
                            </th>

                            <th className="p-4 text-left">
                                Payment
                            </th>

                            <th className="p-4 text-left">
                                Date
                            </th>
                            <th className="p-4 text-left">
                                Customer
                            </th>
                            

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center py-8 text-gray-500"
                                >
                                    No orders found
                                </td>

                            </tr>

                        ) : (

                            orders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {order.invoice_no}
                                    </td>

                                    <td className="p-4">
                                        ₹{order.total}
                                    </td>

                                    <td className="p-4 capitalize">
                                        {order.payment_method}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString()}
                                    </td>
                               <td className="p-4">

                              
                                {order.customer
                                    ? order.customer.name
                                    : "Walk-In"}

                               </td>
                                    <td className="p-4">

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/orders/${order.id}`
                                                )
                                            }
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </DashboardLayout>
    );
}