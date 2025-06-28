import React from 'react'
import { toast } from 'react-toastify';

export default function OAuth() {
    const handleGoogleSignIn = () => {


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
