import React from "react";
import Header from "../components/login/Header";
import Footer from "../components/global/Footer";
import NumberForm from "../components/login/NumberForm";
import "../styles/pages/Verification.css";

const Verification = () => {
  return (
    <div className="verification flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <div className="verification-form text-start text-white py-12 px-10 rounded-lg shadow-lg">
          <h2 className="text-3xl mb-2">Verify</h2>
          <p className="mb-10">
            Please enter the 6-digit pin sent to your email.
          </p>
          <NumberForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Verification;
