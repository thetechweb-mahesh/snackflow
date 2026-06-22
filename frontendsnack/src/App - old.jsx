import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Categories  from "./pages/Categories/Categories";
import Items from "./pages/Items/Items";
import POS from "./pages/POS/POS";
import OrderIndex from "./pages/orders/Index";
import OrderCreate from "./pages/orders/Create";
import OrderShow from "./pages/orders/Show";
import ExpenseCategoryIndex from "./pages/expense-categories/Index";
import ExprenseIndex from "./pages/expenses/Index";
import ReportsIndex from "./pages/reports/Index";


import StaffIndex from "./pages/Staff/Index";
import StaffCreate from "./pages/Staff/Create";
import StaffEdit from "./pages/Staff/Edit";
import StaffShow from "./pages/Staff/Show";


import CustomerIndex from "./pages/customers/Index";
import CustomerCreate from "./pages/customers/Create";
import CustomerEdit from "./pages/customers/Edit";
import CustomerShow from "./pages/customers/Show";

import MenuShow from "./pages/menu/Show";
import SettingsIndex from "./pages/settings/Index";
function App() {

    return (
       <BrowserRouter>
    <Routes>

        <Route
            path="/"
            element={<Navigate to="/login" />}
        />

        <Route
            path="/login"
            element={<Login />}
        />

        <Route
            path="/register"
            element={<Register />}
        />

        <Route
            path="/dashboard"
            element={<Dashboard />}
        />

<Route
    path="/categories"
    element={<Categories />}
/>
<Route
    path="/items"
    element={<Items />}
/>

<Route
    path="/pos"
    element={<POS />}
/>
<Route path="/orders" element={<OrderIndex />} />
<Route path="/orders/create" element={<OrderCreate />} />
<Route path="/orders/:id" element={<OrderShow />} />
<Route
    path="/expense-categories"
    element={<ExpenseCategoryIndex />}
/>
<Route
    path="/expenses"
    element={<ExprenseIndex />}
/>
<Route
    path="/reports"
    element={<ReportsIndex />}
/>

<Route
    path="/customers"
    element={<CustomerIndex />}
/>
<Route
    path="/customers/create"
    element={<CustomerCreate />}
/>

<Route
    path="/customers/:id/edit"
    element={<CustomerEdit />}
/>
<Route
    path="/customers/:id"
    element={<CustomerShow />}
/>


<Route
    path="/staff"
    element={<StaffIndex />}
/>
<Route
    path="/staff/create"
    element={<StaffCreate />}
/>

<Route
    path="/staff/:id/Edit"
    element={<StaffEdit />}
/>

<Route
    path="/staff/:slug"
    element={<StaffShow />}
/>


<Route
    path="/menu/:slug"
    element={<MenuShow />}
/>
<Route
    path="/settings"
    element={<SettingsIndex />}
/>
    </Routes>
</BrowserRouter>
    );
}

export default App;