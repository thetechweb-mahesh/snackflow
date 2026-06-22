import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Index() {

    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStaff = async () => {

        try {

            const res = await api.get("/staff");

            setStaff(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    const deleteStaff = async (id) => {

        if (!window.confirm("Delete this staff member?")) {
            return;
        }

        try {

            await api.delete(`/staff/${id}`);

            fetchStaff();

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        fetchStaff();

    }, []);

    return (
        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-2xl font-bold">
                    Staff Management
                </h1>

                <Link
                    to="/staff/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add Staff
                </Link>

            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>
                                <th className="text-left p-4">
                                    Name
                                </th>

                                <th className="text-left p-4">
                                    Email
                                </th>

                                <th className="text-left p-4">
                                    Role
                                </th>

                                <th className="text-left p-4">
                                    Actions
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>
                                    <td
                                        colSpan="4"
                                        className="p-4 text-center"
                                    >
                                        Loading...
                                    </td>
                                </tr>

                            ) : staff.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="4"
                                        className="p-4 text-center"
                                    >
                                        No Staff Found
                                    </td>
                                </tr>

                            ) : (

                                staff.map((member) => (

                                    <tr
                                        key={member.id}
                                        className="border-t"
                                    >

                                        <td className="p-4">
                                            {member.name}
                                        </td>

                                        <td className="p-4">
                                            {member.email}
                                        </td>

                                        <td className="p-4">

                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                                {member.role}

                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <div className="flex gap-2">

                                                <Link
                                                    to={`/staff/${member.id}/edit`}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        deleteStaff(
                                                            member.id
                                                        )
                                                    }
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </DashboardLayout>
    );
}