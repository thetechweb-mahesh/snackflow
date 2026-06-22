import {
    FaHome,
    FaList,
    FaBox,
    FaShoppingCart,
    FaSignOutAlt,FaCashRegister,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col">

            <div className="p-5 border-b border-slate-700">

                <h1 className="text-2xl font-bold">
                    SnackFlow
                </h1>

                <p className="text-xs text-gray-400">
                    POS System
                </p>

            </div>

            <nav className="flex-1 p-4">

                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 mb-2"
                >
                    <FaHome />
                    Dashboard
                </Link>
                <Link
    to="/settings"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
>
    Settings
</Link>

                <Link
                    to="/categories"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 mb-2"
                >
                    <FaList />
                    Categories
                </Link>
{/* <Link
    to={`/menu/${shop.slug}`}
    target="_blank"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
>
    View Menu
</Link> */}
                <Link
                    to="/items"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 mb-2"
                >
                    <FaBox />
                    Items
                </Link>

                <Link
                    to="/orders"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
                >
                    <FaShoppingCart />
                    Orders
                </Link>

<Link
    to="/pos"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
>
    <FaCashRegister />
    POS
</Link>
<Link
    to="/expense-categories"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
>
    Expense Categories
</Link>

<Link
    to="/expenses"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
>
    Expense 
</Link>

<Link
    to="/reports"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
>
    Reports
</Link>

<Link
    to="/staff"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
>
    staff
</Link>


<Link
    to="/customers"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
>
    Customers
</Link>
            </nav>

            <div className="p-4">

                <button
                    onClick={logout}
                    className="flex items-center gap-3 bg-red-500 w-full p-3 rounded-lg"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </div>
    );
}