import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {

    return (
        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-6">

                Dashboard

            </h1>

            <div className="grid md:grid-cols-4 gap-4">

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="text-gray-500">
                        Today Sales
                    </h3>

                    <p className="text-2xl font-bold">
                        ₹0
                    </p>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="text-gray-500">
                        Orders
                    </h3>

                    <p className="text-2xl font-bold">
                        0
                    </p>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="text-gray-500">
                        Customers
                    </h3>

                    <p className="text-2xl font-bold">
                        0
                    </p>

                </div>

                <div className="bg-white p-5 rounded-xl shadow">

                    <h3 className="text-gray-500">
                        Items
                    </h3>

                    <p className="text-2xl font-bold">
                        0
                    </p>

                </div>

            </div>

        </DashboardLayout>
    );
}