import { Bell } from "lucide-react";

const Header = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <div>

        <h2 className="text-xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 text-sm">
          Manage your AI ecommerce SaaS
        </p>

      </div>

      <div className="flex items-center gap-4">

        <button className="relative">

          <Bell />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            2
          </span>

        </button>

        <div className="flex items-center gap-2">

          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            {user?.name?.charAt(0)}
          </div>

          <div>

            <h3 className="font-semibold">
              {user?.name}
            </h3>

            <p className="text-xs text-gray-500">
              Store Owner
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Header;