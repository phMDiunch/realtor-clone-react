import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Đã gửi email đặt lại mật khẩu! Vui lòng kiểm tra hộp thư.");
      navigate("/signin");
    } catch (error) {
      toast.error("Gửi email thất bại: " + error.message);
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center font-bold py-5">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center max-w-6xl mx-auto px-3">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2V5fGVufDB8fDB8fHww"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-2/5 lg:ml-20 mt-6">
          <form onSubmit={onSubmit}>
            <input
              className="w-full px-4 py-2 text-xl rounded"
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
            <div>
              <button
                className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                type="submit"
              >
                Send Reset Password
              </button>
            </div>
          </form>
          <div>
            <p className="mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
            <p className="mt-2">
              Have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
          <OAuth />
        </div>
      </div>
    </section>
  );
}
