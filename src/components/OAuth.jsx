import React from 'react'
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Kiểm tra nếu user chưa có trong Firestore thì thêm mới
            const userRef = doc(db, "users", user.uid);
            console.log("User Reference:", userRef);
            const userSnap = await getDoc(userRef);
            console.log("User Snapshot:", userSnap.data());
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: new Date()
                });
            }

            toast.success("Đăng nhập Google thành công!");
            navigate("/");
        } catch (error) {
            toast.error("Đăng nhập Google thất bại: " + error.message);
        }
    }

    return (
        <button
            className="w-full mt-6 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            type="button"
            onClick={handleGoogleSignIn}
        >
            Sign In with Google
        </button>
    )
}
