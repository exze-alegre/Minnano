import React from "react";
import "../../styles/components/global/Navbar.css";

const Header = () => {
  return (
    <div className="header">
      <nav className="bg-white border-b shadow-md px-20">
        <div className="max-w-screen-2xl mx-auto py-5">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center justify-start">
              <a href="http://localhost:3000/" className="flex items-center">
                <img
                  src="https://via.placeholder.com/100?text=logo"
                  alt="logo"
                  className="h-14 pe-3"
                />
                <span className="brand self-center text-2xl text-red-600 whitespace-nowrap">
                  MINNANO
                </span>
              </a>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-end text-end text-red-600 text-xl px-6">
              <span>Need Help?</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
