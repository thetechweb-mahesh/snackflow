import { useEffect, useState , useRef } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
// import QRCode from "react-qr-code";
import QRCodeModule from "react-qr-code";
import { toPng } from "html-to-image";

export default function Index() {
    const qrRef = useRef(null);

    const [loading, setLoading] =
        useState(false);
const QRCode = QRCodeModule.default || QRCodeModule;
    const [form, setForm] =
        useState({
              name: "",
                phone: "",
                email: "",
                address: "",
                slug: ""
            
        });

    useEffect(() => {
        fetchSettings();
    }, []);

   const fetchSettings = async () => {
    try {
        const res = await api.get("/settings");

        console.log("API RESPONSE:", res.data);

        setForm(res.data); // OR res.data.data (check log)
    } catch (error) {
        console.log(error);
    }
};

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
console.log(form);
await api.put("/settings", {
    name: form.name || "",
    phone: form.phone || "",
    email: form.email || "",
    address: form.address || "",
    slug: form.slug || "",
});

        alert("Settings Updated");

    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};
 const downloadQR = async () => {

    if (!qrRef.current) {
        return;
    }

    const dataUrl = await toPng(qrRef.current);

    const link = document.createElement("a");

    link.download = "menu-qr.png";

    link.href = dataUrl;

    link.click();
};
    return (
        <DashboardLayout>

            <div className="max-w-4xl mx-auto">

                <div className="bg-white rounded-xl shadow p-6">

                    <h1 className="text-2xl font-bold mb-6">
                        Shop Settings
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <div>

                            <label>
                                Shop Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name || ""}
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <div>

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={form.phone || ""}
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <div>

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email || ""}
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <div>

                            <label>
                                Address
                            </label>

                            <textarea
                                rows="3"
                                name="address"
                                value={
                                    form.address || ""
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Settings"}
                        </button>

                    </form>

                </div>

                {/* QR Menu Section */}

                <div className="bg-white rounded-xl shadow p-6 mt-6">

    <h2 className="text-xl font-bold mb-4">
        QR Menu Link
    </h2>

    <div className="bg-gray-100 p-3 rounded-lg break-all">
        {window.location.origin}/menu/{form.slug}
    </div>

    <div className="mt-6 flex justify-center">

        <div  ref={qrRef} className="bg-white p-4 border rounded-lg">

            <QRCode
                size={220}
                value={`${window.location.origin}/menu/${form.slug}`}
            />

        </div>

    </div>

    <div className="mt-4 text-center">

        <button
            onClick={downloadQR}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
            Download QR
        </button>

    </div>

</div>

            </div>

        </DashboardLayout>
    );
}