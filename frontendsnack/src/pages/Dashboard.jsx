import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";


export default function Dashboard() {

    const [stats, setStats] = useState({
        today_sales: 0,
        today_orders: 0,
        total_items: 0,
        top_item: null,
        recent_orders: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {

        try {

            const res = await api.get(
                "/dashboard/stats"
            );

            setStats(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (
            <DashboardLayout>
                <div className="p-6">
                    Loading Dashboard...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="space-y-6">

                {/* Header */}

                <div>

                    <h1 className="text-3xl font-bold">
                        Dashboard
                    </h1>

                    <p className="text-gray-500">
                        Welcome to SnackFlow POS
                    </p>

                </div>

                {/* Stats Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    <div className="bg-white rounded-xl shadow p-5">

                            <h3 className="text-gray-500">
                                Today's Expenses
                            </h3>

                            <p className="text-3xl font-bold mt-2">
                                ₹{stats.today_expenses}
                            </p>

                        </div>


                        <div className="bg-white rounded-xl shadow p-5">

                                <h3 className="text-gray-500">
                                    Today's Profit
                                </h3>

                                <p className="text-3xl font-bold mt-2">
                                    ₹{stats.today_profit}
                                </p>

                            </div>

                    <div className="bg-white rounded-xl shadow p-5">

                        <h3 className="text-gray-500">
                            Today's Sales
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            ₹{stats.today_sales}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-5">

                        <h3 className="text-gray-500">
                            Today's Orders
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {stats.today_orders}
                        </p>

                    </div>
   <div className="bg-white p-5 rounded-xl shadow">
        <h3>Customers</h3>
        <h2>
            {stats?.customers || 0}
        </h2>
    </div>
                    <div className="bg-white rounded-xl shadow p-5">

                        <h3 className="text-gray-500">
                            Total Items
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {stats.total_items}
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-5">

                        <h3 className="text-gray-500">
                            Top Selling Item
                        </h3>

                        <p className="text-xl font-bold mt-2">

                            {stats.top_item?.item?.name ||
                                "No Sales"}

                        </p>

                    </div>

                </div>

                {/* Recent Orders */}

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

                                <th className="p-4 text-left">
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {stats.recent_orders
                                ?.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center py-6 text-gray-500"
                                    >
                                        No Orders Found
                                    </td>

                                </tr>

                            ) : (

                                stats.recent_orders?.map(
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

                                            <td className="p-4">
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleDateString()}
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