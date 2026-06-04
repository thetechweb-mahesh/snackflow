import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChartColumn } from "lucide-react";
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Users,
  Eye,
  Tag,
  Warehouse,
  ChevronDown,
  ChevronRight,
  BarChart,
} from "lucide-react";

const Sidebar = () => {
   const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const menus = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    path: "/dashboard",
  },
  {
    name: "View Store",
    icon: <Eye size={18} />,
    path: "/viewstore",
  },

  {
    name: "Add Store",
    icon: <Store size={18} />,
    path: "/create",
  },
    {
    name: "Customers",
    icon: <Users size={18} />,
    path: "/customers",
  },
    {
    name: "Products",
    icon: <Package size={18} />,
    path: "/products",
  },
  {
    name: "Categories",
    icon: <Tag size={18} />,
    path: "/categories",
  },

  {
    name: "Orders",
    icon: <ShoppingCart size={18} />,
    path: "/orders",
  },
{
  name: "Inventory",
  icon: <Warehouse size={18} />,
  children: [
    {
      name: "Dashboard",
      path: "/inventory",
    },
    {
      name: "Stock In",
      path: "/inventory/stock-in",
    },
    {
      name: "Stock Out",
      path: "/inventory/stock-out",
    },
    {
      name: "History",
      path: "/inventory/history",
    },
  ],
},

{
    name: "Reports",
    icon: <ChartColumn size={18} />,
    children: [
        {
            name: "Dashboard",
            path: "/reports"
        },
        {
            name: "Sales Report",
            path: "/reports/sales"
        },
        {
            name: "Inventory Report",
            path: "/reports/inventory"
        },
        {
            name: "Customer Report",
            path: "/reports/customers"
        },
        {
            name: "Profit & Loss",
            path: "/reports/profit-loss"
        }
    ]
},
];
  return (
    <div className="w-64 bg-black text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        SmartCommerce
      </h1>

      <div className="space-y-2">

    {menus.map((menu, index) => (
  <div key={index}>
    {menu.children ? (
      <>
        <button
          onClick={() =>
            setOpenMenu(openMenu === index ? null : index)
          }
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800"
        >
          <div className="flex items-center gap-3">
            {menu.icon}
            <span>{menu.name}</span>
          </div>

          {openMenu === index ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        {openMenu === index && (
          <div className="ml-8 mt-1 space-y-1">
            {menu.children.map((child, childIndex) => (
              <Link
                key={childIndex}
                to={child.path}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  location.pathname === child.path
                    ? "bg-white text-black"
                    : "hover:bg-gray-800"
                }`}
              >
                {child.name}
              </Link>
            ))}
          </div>
        )}
      </>
    ) : (
      <Link
        to={menu.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
          location.pathname === menu.path
            ? "bg-white text-black"
            : "hover:bg-gray-800"
        }`}
      >
        {menu.icon}
        <span>{menu.name}</span>
      </Link>
    )}
  </div>
))}
      </div>

    </div>
  );
};

export default Sidebar;