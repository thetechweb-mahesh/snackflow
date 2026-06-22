import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function Show() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const user = JSON.parse(
    localStorage.getItem("user")
);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {

        try {

            const res = await api.get(
                `/orders/${id}`
            );

            setOrder(res.data);

        } catch (error) {

            console.log(error);

        }
    };

    if (!order) {

        return (
            <DashboardLayout>
                <div className="p-6">
                    Loading...
                </div>
            </DashboardLayout>
        );
    }
const downloadInvoice = async () => {

    try {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(
                `${import.meta.env.VITE_API_URL}/orders/${id}/download`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const blob =
            await response.blob();

        const url =
            window.URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            `${order.invoice_no}.pdf`;

        link.click();

    } catch (error) {

        console.log(error);

    }
};

const updateStatus = async (
    status
) => {

    try {

        await api.put(
            `/orders/${id}/status`,
            { status }
        );

        setOrder({
            ...order,
            status
        });

        alert(
            "Status Updated"
        );

    } catch (err) {

        console.log(err);

    }
};
    return (
        <DashboardLayout>

            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-xl shadow p-6">

                    {/* Header */}

                    <div className="flex justify-between border-b pb-4">

                        <div>

                            <h1 className="text-2xl font-bold">
                                Invoice
                            </h1>

                            <p className="text-gray-500">
                                {order.invoice_no}
                            </p>

                        </div>

                        <div className="text-right">

                            <p>
                                {new Date(
                                    order.created_at
                                ).toLocaleString()}
                            </p>

                        </div>

                    </div>

                    {/* Info */}

                    <div className="mt-6 grid grid-cols-2 gap-4">

                        <div>

                            <h3 className="font-semibold">
                                Payment Method
                            </h3>

                            <p className="capitalize">
                                {order.payment_method}
                            </p>

                        </div>

                        <div>

                            <h3 className="font-semibold">
                                Total
                            </h3>

                            <p>
                                ₹{order.total}
                            </p>

                        </div>

                    </div>

                    {/* Items */}

                    <div className="mt-8">

                        <table className="w-full">

                            <thead>

                                <tr className="border-b">

                                    <th className="p-3 text-left">
                                        Item
                                    </th>

                                    <th className="p-3 text-center">
                                        Qty
                                    </th>

                                    <th className="p-3 text-right">
                                        Price
                                    </th>

                                    <th className="p-3 text-right">
                                        Subtotal
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {order.items.map(
                                    (row) => (

                                        <tr
                                            key={row.id}
                                            className="border-b"
                                        >

                                            <td className="p-3">
                                                {
                                                    row.item
                                                        ?.name
                                                }
                                            </td>

                                            <td className="p-3 text-center">
                                                {
                                                    row.qty
                                                }
                                            </td>

                                            <td className="p-3 text-right">
                                                ₹
                                                {
                                                    row.price
                                                }
                                            </td>

                                            <td className="p-3 text-right">
                                                ₹
                                                {
                                                    row.subtotal
                                                }
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Footer */}

                    <div className="mt-8 flex justify-end">

                        <div className="w-64">

                            <div className="flex justify-between text-2xl font-bold">

                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹
                                    {
                                        order.total
                                    }
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="mt-8 flex gap-3">

                        <button
                            onClick={() =>
                                window.print()
                            }
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Print
                        </button>
<button
    onClick={downloadInvoice}
    className="bg-green-600 text-white px-4 py-2 rounded-lg"
>
    Download PDF
</button>
                    </div>
                    

    <div className="mt-1 flex justify-end">

    <label className="block mb-1 font-semibold">
        Order Status
    </label>
{user?.role === "owner" && (
    <select
        value={
            order?.status || ""
        }
        onChange={(e) =>
            updateStatus(
                e.target.value
            )
        }
        className="border rounded-lg px-3 py-2"
    >

        <option value="pending">
            Pending
        </option>

        <option value="completed">
            Completed
        </option>

        <option value="cancelled">
            Cancelled
        </option>

    </select>
)}
</div>
                </div>

            </div>

        </DashboardLayout>
    );
}