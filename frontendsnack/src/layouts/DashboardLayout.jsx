import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const DashboardLayout = ({ children }) => {

  return (

    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1 min-h-screen">

        <Header />

        <div className="p-6">

          {children}

        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;