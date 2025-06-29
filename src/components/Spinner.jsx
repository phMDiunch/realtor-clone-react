import React from "react";

export default function Spinner() {
    return (
        <div className="flex justify-center items-center h-full w-full py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
    );
}