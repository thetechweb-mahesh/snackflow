import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Index() {

    const today = new Date()
        .toISOString()
        .split("T")[0];

    const firstDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
    )
        .toISOString()
        .split("T")[0];

    const [from, setFrom] = useState(firstDay);
    const [to, setTo] = useState(today);

    const [report, setReport] = useState({
        sales: 0,
        expenses: 0,
        profit: 0,
        orders: 0,
    });

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {

        try {

            const res = await api.get(
                "/reports/summary",
                {
                    params: {
                        from,
                        to,
                    },
                }
            );

            setReport(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <DashboardLayout>

            <div className="space-y-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Reports
                    </h1>

                    <p className="text-gray-500">
                        Sales, Expenses & Profit
                    </p>

                </div>

                {/* Filters */}

                <div className="bg-white p-4 rounded-xl shadow">

                    <div className="flex flex-col md:flex-row gap-4">

                        <input
                            type="date"
                            value={from}
                            onChange={(e) =>
                                setFrom(
                                    e.target.value
                                )
                            }
                            className="border rounded-lg px-4 py-2"
                        />

                        <input
                            type="date"
                            value={to}
                            onChange={(e) =>
                                setTo(
                                    e.target.value
                                )
                            }
                            className="border rounded-lg px-4 py-2"
                        />

                        <button
                            onClick={fetchReport}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Generate Report
                        </button>

                    </div>

                </div>

                {/* Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    <div className="bg-white rounded-xl shadow p-5">
                        <h3 className="text-gray-500">
                            Sales
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            ₹{report.sales}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5">
                        <h3 className="text-gray-500">
                            Expenses
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            ₹{report.expenses}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5">
                        <h3 className="text-gray-500">
                            Profit
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            ₹{report.profit}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5">
                        <h3 className="text-gray-500">
                            Orders
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {report.orders}
                        </p>
                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}