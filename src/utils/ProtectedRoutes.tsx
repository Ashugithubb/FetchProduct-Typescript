import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../Component/UserData";

const ProtectedRoutes = () => {
    const { isAuthenticated } = useUser();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;