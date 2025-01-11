import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/login/Header";
import Footer from "../components/global/Footer";
import Loader from "../components/global/Loader";
import Notification from "../components/global/Notification"; // Assuming you have a Notification component
import "../styles/pages/Verification.css";

const Verification = () => {
  const [values, setValues] = useState(Array(6).fill("")); // Manage state for each input digit
  const [notification, setNotification] = useState([]); // Notification state
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || localStorage.getItem("email");

  // Set the email in localStorage so it persists
  if (!localStorage.getItem("email")) {
    localStorage.setItem("email", emailFromState);
  }

  const handleChange = (e, index) => {
    const newValues = [...values];
    newValues[index] = e.target.value.slice(0, 1);
    setValues(newValues);

    if (e.target.value && index < 5) {
      inputRefs.current[index + 1].current.focus(); // Move to next input field
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && values[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].current.focus(); // Move to previous input field if backspace is pressed
      }
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailFromState }), // Send the email to resend the code
      });

      if (response.ok) {
        setNotification((prevNotification) => [
          ...prevNotification,
          {
            id: Date.now(),
            message:
              "Verification code has been resent. Please check your email.",
          },
        ]);
      } else {
        setNotification((prevNotification) => [
          ...prevNotification,
          {
            id: Date.now(),
            message: "Failed to resend verification code. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error resending code:", error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    console.log({ emailFromState });
    const code = values.join("");

    try {
      const response = await fetch("http://localhost:5000/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailFromState, code }), // Send email and code to the backend
      });

      if (response.ok) {
        setIsLoading(true);

        setTimeout(() => {
          navigate(`/signup?email=verified`, {
            state: { email: emailFromState },
          });
          setIsLoading(false);
        }, 500);
      } else {
        // Trigger notification if verification fails
        setNotification((prevNotification) => [
          ...prevNotification,
          {
            id: Date.now(),
            message: "Incorrect code. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <div className="verification flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <div className="verification-form text-start text-white py-12 px-10 rounded-lg shadow-lg">
          <h2 className="text-3xl mb-2">Verify</h2>
          <p className="mb-6">
            Please enter the 6-digit pin sent to your email.
          </p>

          {/* Display notifications */}
          {notification.length > 0 && (
            <Notification notification={notification} />
          )}

          <form onSubmit={handleVerify}>
            <div className="flex space-x-2">
              {values.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={inputRefs.current[index]}
                  className="w-12 h-12 text-center text-xl text-cyan-400 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              ))}
            </div>

            <button
              onClick={handleResend}
              className="text-xs mt-1 hover:underline"
            >
              Didn't get an email? Resend verification code
            </button>

            <div className="flex justify-center my-7">
              <button
                type="submit"
                className="px-20 py-2 text-sm mt-1.5 rounded-lg bg-red-500 hover:bg-red-600"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Resend verification code link */}
        </div>
      </div>
      <Footer />
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default Verification;
