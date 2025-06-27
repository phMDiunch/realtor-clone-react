import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState();

  function onChange(e) {
    setEmail(e.target.value);
  };
  return (
    <section>
      <h1 className="text-3xl text-center font-bold py-5">Forgot Password</h1>
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

        </div>
        <OAuth />
      </div>
    </section>
  );
}
