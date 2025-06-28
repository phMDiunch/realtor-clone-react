import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function PrivateRoute({ children }) {
    const [checking, setChecking] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setChecking(false);
        });
        return () => unsubscribe();
    }, []);

    if (checking) return <div>Loading...</div>;
    return user ? children : <Navigate to="/signin" />;
}