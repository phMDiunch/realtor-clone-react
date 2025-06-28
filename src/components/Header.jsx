import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="bg-white border-b shadow-sm sticky top-0 z-50">
            <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
                <img
                    className="h-5 cursor-pointer"
                    src="https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg"
                    alt="Logo"
                    onClick={() => navigate("/")}
                />
                <div>
                    <ul className="flex space-x-10">
                        <li
                            className={` hover:text-red-600 ${location.pathname === "/" && "border-b-2 border-red-600"
                                }`}
                        >
                            {" "}
                            <Link to="/">Home</Link>
                        </li>
                        <li
                            className={` hover:text-red-600 ${location.pathname === "/offers" && "border-b-2 border-red-600"
                                }`}
                        >
                            {" "}
                            <Link to="/offers">Offers</Link>
                        </li>
                        {user ? (
                            <li
                                className={`hover:text-red-600 ${location.pathname === "/profile" && "border-b-2 border-red-600"}`}
                            >
                                <Link to="/profile">Profile</Link>
                            </li>
                        ) : (
                            <li
                                className={`hover:text-red-600 ${location.pathname === "/signin" && "border-b-2 border-red-600"}`}
                            >
                                <Link to="/signin">Sign In</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </header>
        </div>
    );
}
