import { Navigate } from "react-router-dom";

export default function OwnerRoute({ children }) {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== "owner") {
        return <Navigate to="/dashboard" />;
    }

    return children;
}


// import Unauthorized from "../../pages/errors/Unauthorized";

// export default function OwnerRoute({
//     children
// }) {

//     const user = JSON.parse(
//         localStorage.getItem("user")
//     );

//     if (!user) {
//         return <Navigate to="/login" />;
//     }

//     if (user.role !== "owner") {
//         return <Unauthorized />;
//     }

//     return children;
// }