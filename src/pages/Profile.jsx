import React, { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    name: user.displayName || "",
    email: user.email || "",
  });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Focus vào input khi chuyển sang edit
  useEffect(() => {
    if (editing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editing]);

  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSave() {
    try {
      if (user.displayName !== formData.name) {
        await updateProfile(user, { displayName: formData.name });
        toast.success("Cập nhật thông tin thành công!");
      }
      setEditing(false);
    } catch (error) {
      toast.error("Cập nhật thất bại: " + error.message);
    }
  }

  function handleCancel() {
    setFormData((prev) => ({
      ...prev,
      name: user.displayName || "",
    }));
    setEditing(false);
  }

  function signOut() {
    auth.signOut();
    navigate("/signin");
  }

  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Profile
      </h1>
      <form onSubmit={e => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Tên
          </label>
          <input
            ref={nameInputRef}
            className={`w-full px-4 py-2 border rounded }`}
            type="text"
            id="name"
            value={formData.name}
            onChange={onChange}
            required
            disabled={!editing}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded"
            type="email"
            id="email"
            value={formData.email}
            disabled={true} // Email is not editable
          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <p>
            Thay đổi tên?{" "}
            {editing ? (
              <>
                <span
                  className="text-green-600 cursor-pointer font-semibold mr-4"
                  onClick={handleSave}
                >
                  Save
                </span>
                <span
                  className="text-gray-500 cursor-pointer font-semibold"
                  onClick={handleCancel}
                >
                  Cancel
                </span>
              </>
            ) : (
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => setEditing(true)}
              >
                Edit
              </span>
            )}
          </p>
          <p className="text-blue-500 cursor-pointer" onClick={signOut}>
            Sign out
          </p>
        </div>
      </form>
      <div className="mt-6">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => navigate("/create-listing")}
        >
          Tạo thông tin nhà cho thuê/bán
        </button>
      </div>
    </section>
  );
}
