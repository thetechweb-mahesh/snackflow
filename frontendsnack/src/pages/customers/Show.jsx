import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Show() {

    const { id } = useParams();

    const [data, setData] =
        useState(null);

    useEffect(() => {
        fetchCustomer();
    }, []);

    const fetchCustomer = async () => {

        try {

            const res = await api.get(
                `/customers/${id}`
            );

            setData(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    if (!data) {

        return (
            <DashboardLayout>
                <div className="p-6">
                    Loading...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="space-y-6">

                {/* Customer Info */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h1 className="text-2xl font-bold">
                        {data.customer.name}
                    </h1>

                    <p className="text-gray-500">
                        {data.customer.phone}
                    </p>

                    <p className="text-gray-500">
                        {data.customer.email}
                    </p>

                    <p className="text-gray-500">
                        {data.customer.address}
                    </p>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="bg-white rounded-xl shadow p-5">

                        <h3 className="text-gray-500">
                            Total Orders
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {data.total}
                             {/* {data.total_orders} */}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-5">

                        <h3 className="text-gray-500">
                            Lifetime Spend
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            ₹{data.total_spend}
                        </p>

                    </div>

                </div>

                {/* Orders */}

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <div className="p-4 border-b">

                        <h2 className="text-xl font-bold">
                            Recent Orders
                        </h2>

                    </div>

                    <table className="w-full">

                        <thead>

                            <tr className="bg-gray-50 border-b">

                                <th className="p-4 text-left">
                                    Invoice
                                </th>

                                <th className="p-4 text-left">
                                    Total
                                </th>

                                <th className="p-4 text-left">
                                    Payment
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {data.recent_orders
                                ?.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="3"
                                        className="text-center py-6"
                                    >
                                        No Orders
                                    </td>

                                </tr>

                            ) : (

                                data.recent_orders.map(
                                    (order) => (

                                        <tr
                                            key={order.id}
                                            className="border-b"
                                        >

                                            <td className="p-4">
                                                {
                                                    order.invoice_no
                                                }
                                            </td>

                                            <td className="p-4">
                                                ₹
                                                {
                                                    order.total
                                                }
                                            </td>

                                            <td className="p-4 capitalize">
                                                {
                                                    order.payment_method
                                                }
                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );
}