import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Show() {

    const { id } = useParams();

    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStaff = async () => {

        try {

            const res = await api.get(
                `/staff/${id}`
            );

            setStaff(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchStaff();

    }, []);

    if (loading) {

        return (
            <DashboardLayout>
                <div className="p-6">
                    Loading...
                </div>
            </DashboardLayout>
        );
    }

    if (!staff) {

        return (
            <DashboardLayout>
                <div className="p-6">
                    Staff not found
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="max-w-3xl mx-auto">

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-center mb-6">

                        <h1 className="text-2xl font-bold">
                            Staff Details
                        </h1>

                        <Link
                            to={`/staff/${staff.id}/edit`}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                        >
                            Edit Staff
                        </Link>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>

                            <label className="text-gray-500 text-sm">
                                Name
                            </label>

                            <p className="font-semibold text-lg">
                                {staff.name}
                            </p>

                        </div>

                        <div>

                            <label className="text-gray-500 text-sm">
                                Email
                            </label>

                            <p className="font-semibold text-lg">
                                {staff.email}
                            </p>

                        </div>

                        <div>

                            <label className="text-gray-500 text-sm">
                                Role
                            </label>

                            <p>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                    {staff.role}
                                </span>
                            </p>

                        </div>

                        <div>

                            <label className="text-gray-500 text-sm">
                                Staff ID
                            </label>

                            <p className="font-semibold">
                                #{staff.id}
                            </p>

                        </div>

                        <div>

                            <label className="text-gray-500 text-sm">
                                Created At
                            </label>

                            <p className="font-semibold">
                                {new Date(
                                    staff.created_at
                                ).toLocaleString()}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}