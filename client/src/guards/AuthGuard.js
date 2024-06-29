import { useAuth } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (location.pathname === "/login") {
        if (isAuthenticated) {
            return <Navigate to="/" />;
        }

        return children;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;
