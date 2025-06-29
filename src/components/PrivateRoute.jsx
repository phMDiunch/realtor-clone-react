import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import Spinner from "./Spinner";

export default function PrivateRoute({ children }) {
    const { user, checking } = useAuth();

    if (checking) return <Spinner />;
    return user ? children : <Navigate to="/signin" />;
}