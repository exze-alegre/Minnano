import React from "react";
import Header from "../components/login/Header";
import Footer from "../components/global/Footer";
import Facebook from "../assets/global/036-facebook.png";
import Google from "../assets/global/Google__G__logo.svg.png";
import "../styles/pages/SignUp.css";

const SignUp = () => {
  return (
    <div className="signup flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow grid grid-cols-[7fr_5fr]">
        <div className="flex items-center justify-center">
          <img src="https://via.placeholder.com/500?text=Logo" alt="Logo" />
        </div>
        <div className="flex items-center justify-center text-white">
          <div className="signup-form text-start py-12 px-10 rounded-lg">
            <h1 className="text-3xl mb-7">Sign up</h1>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] block w-full p-3 mb-6"
              placeholder="Enter your Email"
            />
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-[15px] block w-full p-3"
              placeholder="Enter your Password"
            />
            <div className="flex justify-between p-2">
              <small>Forgot Password?</small>
              <small>Forgot Email?</small>
            </div>
            <div className="flex justify-center">
              <button className="px-16 py-3 mt-1.5 rounded-full hover:bg-red-700">
                Register
              </button>
            </div>
            <div className="grid grid-cols-3 items-center justify-center my-3">
              <hr className="opacity-40" />
              <small className="text-white text-center">or</small>
              <hr className="opacity-40" />
            </div>
            <div className="flex flex-cols items-center justify-evenly gap-5">
              <span className="bg-gray-50 rounded-lg flex items-center text-gray-900 py-1.5 px-3">
                <img src={Facebook} alt="" className="h-7 rounded-full me-2" />
                Facebook
              </span>
              <span className="bg-gray-50 rounded-lg flex items-center text-gray-900 py-1.5 px-3">
                <img src={Google} alt="" className="h-7 rounded-full me-2" />
                Google
              </span>
            </div>
            <div className="flex justify-center">
              <a className="text-white py-3">Already have an account? Login</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
