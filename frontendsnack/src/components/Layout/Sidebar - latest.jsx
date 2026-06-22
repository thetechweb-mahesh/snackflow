import {
    FaHome,
    FaList,
    FaBox,
    FaShoppingCart,
    FaSignOutAlt,
    FaCashRegister,
    FaCog,
    FaUsers,
    FaUserFriends,
    FaChartBar,
    FaMoneyBillWave,
} from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ setSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />,
        },
        {
            name: "Settings",
            path: "/settings",
            icon: <FaCog />,
        },
        {
            name: "Categories",
            path: "/categories",
            icon: <FaList />,
        },
        {
            name: "Items",
            path: "/items",
            icon: <FaBox />,
        },
        {
            name: "Orders",
            path: "/orders",
            icon: <FaShoppingCart />,
        },
        {
            name: "POS",
            path: "/pos",
            icon: <FaCashRegister />,
        },
        {
            name: "Expense Categories",
            path: "/expense-categories",
            icon: <FaMoneyBillWave />,
        },
        {
            name: "Expenses",
            path: "/expenses",
            icon: <FaMoneyBillWave />,
        },
        {
            name: "Reports",
            path: "/reports",
            icon: <FaChartBar />,
        },
        {
            name: "Staff",
            path: "/staff",
            icon: <FaUsers />,
        },
        {
            name: "Customers",
            path: "/customers",
            icon: <FaUserFriends />,
        },
    ];

    return (
        <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col shadow-xl">

            {/* Logo */}
            <div className="p-5 border-b border-slate-700">

                <h1 className="text-2xl font-bold">
                    SnackFlow
                </h1>

                <p className="text-xs text-slate-400">
                    POS System
                </p>

            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto p-4">

                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() =>
                            setSidebarOpen &&
                            setSidebarOpen(false)
                        }
                        className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-all duration-200
                            
                            ${
                                location.pathname === item.path
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-slate-800 text-slate-300"
                            }
                        `}
                    >
                        <span className="text-lg">
                            {item.icon}
                        </span>

                        <span>{item.name}</span>
                    </Link>
                ))}

            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-slate-700">

                <button
                    onClick={logout}
                    className="flex items-center justify-center gap-3 w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </aside>
    );
}