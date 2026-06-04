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
    </Routes>
</BrowserRouter>
    );
}

export default App;