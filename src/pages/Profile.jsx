import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { updateProfile, updateEmail } from "firebase/auth";
import { toast } from "react-toastify";

export default function Profile() {
  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    name: user.displayName || "",
    email: user.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      if (user.displayName !== formData.name) {
        await updateProfile(user, { displayName: formData.name });
      }
      if (user.email !== formData.email) {
        await updateEmail(user, formData.email);
      }
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error("Cập nhật thất bại: " + error.message);
    }
  }

  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Profile
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Tên
          </label>
          <input
            className="w-full px-4 py-2 border rounded"
            type="text"
            id="name"
            value={formData.name}
            onChange={onChange}
            required
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
            disabled

          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <p>Do you want to change your name? <span className="text-red-500 cursor-pointer">Edit</span></p>
          <p className="text-blue-500 cursor-pointer">Sign out</p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Lưu thay đổi
        </button>
      </form>
    </section>
  );
}
