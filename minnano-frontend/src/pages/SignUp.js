import React, { useState } from "react";
import axios from "axios";
import Header from "../components/login/Header";
import Footer from "../components/global/Footer";
import Facebook from "../assets/global/036-facebook.png";
import Google from "../assets/global/Google__G__logo.svg.png";
import "../styles/pages/SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post();
      navigate("/verify");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow grid grid-cols-[7fr_5fr]">
        <div className="flex items-center justify-center">
          <img src="https://via.placeholder.com/400?text=Logo" alt="Logo" />
        </div>
        <div className="flex items-center justify-center text-white">
          <div className="signup-form text-start py-8 px-10 rounded-lg">
            <h1 className="text-2xl mb-4">Sign up</h1>
            <form>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm block w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-12 py-2 text-sm mt-1.5 rounded-lg hover:bg-red-700"
                >
                  Next
                </button>
              </div>
            </form>
            <div className="grid grid-cols-3 items-center justify-center my-3">
              <hr className="opacity-40" />
              <small className="text-white text-center text-xs">or</small>
              <hr className="opacity-40" />
            </div>
            <div className="flex flex-cols items-center justify-evenly gap-5">
              <span className="bg-gray-50 rounded-lg flex items-center text-sm text-gray-900 py-1.5 px-3">
                <img src={Facebook} alt="" className="h-5 rounded-full me-2" />
                Facebook
              </span>
              <span className="bg-gray-50 rounded-lg flex items-center text-sm text-gray-900 py-1.5 px-3">
                <img src={Google} alt="" className="h-5 rounded-full me-2" />
                Google
              </span>
            </div>
            <div className="flex justify-center">
              <small
                className="text-white text-sm py-3 cursor-pointer"
                onClick={handleLogin}
              >
                Already have an account?{" "}
                <span className="underline">Login</span>
              </small>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
