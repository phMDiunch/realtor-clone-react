import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    console.log(formData);
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section>
      <h1 className="text-3xl text-center font-bold py-5">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center max-x-6xl mx-auto px-3">
        <div className="md:[67%] ld:[50%]">
          <img
            src="https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2V5fGVufDB8fDB8fHww"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 mt-6">
          <form>
            <input
              className="w-full px-4 py-2 text-xl rounded"
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => onChange(e)}
            />
            <div className="relative mt-6">
              <input
                className="w-full px-4 py-2 text-xl rounded"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => onChange(e)}
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
                Sign In
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
              Forgot your password?{" "}
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Reset Password
              </Link>
            </p>
          </div>

        </div>
        <OAuth />
      </div>
    </section>
  );
}
