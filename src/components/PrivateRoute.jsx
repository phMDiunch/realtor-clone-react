import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function PrivateRoute({ children }) {
    const { user, checking } = useAuth();

    if (checking) return <div>Loading...</div>;
    return user ? children : <Navigate to="/signin" />;
}