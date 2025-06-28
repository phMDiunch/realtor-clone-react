import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      await updateProfile(userCredential.user, { displayName: name });
      // Lưu thông tin vào Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        timestamp: new Date(),
      });
      // Hiển thị thông báo thành công
      toast.success("Đăng ký thành công!");
      // Chuyển hướng đến trang chính
      navigate("/");
    } catch (error) {
      toast.error("Đăng ký thất bại: " + error.message);
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center font-bold py-5">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center max-x-6xl mx-auto px-3">
        <div className="md:[67%] ld:[50%]">
          <img
            src="https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2V5fGVufDB8fDB8fHww"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 mt-6">
          <form onSubmit={onSubmit}>
            <input
              className="w-full px-4 py-2 text-xl rounded mt-6"
              type="text"
              id="name"
              value={name}
              placeholder="Name"
              onChange={onChange}
            />
            <input
              className="w-full px-4 py-2 text-xl rounded mt-6"
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
            <div className="relative mt-6">
              <input
                className="w-full px-4 py-2 text-xl rounded"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div>
              <button
                className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div>
            <p className="mt-6">
              Have an account?{" "}
              <Link to="/signin" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
            <p className="mt-2">
              Forgot your password?{" "}
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Reset Password
              </Link>
            </p>
          </div>
          <OAuth />
        </div>
      </div>
    </section>
  );
}
