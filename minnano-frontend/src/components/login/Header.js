import React from "react";
import "../../styles/components/global/Navbar.css";

const Header = () => {
  return (
    <div className="header">
      <nav className="bg-white border-b shadow-md px-[130px]">
        <div className="max-w-screen-2xl mx-auto py-5">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center justify-start">
              <a href="http://localhost:3000/" className="flex items-center">
                <img
                  src="https://via.placeholder.com/100?text=logo"
                  alt="logo"
                  className="h-10 pe-3"
                />
                <span className="brand self-center text-xl text-red-600 whitespace-nowrap">
                  MINNANO
                </span>
              </a>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-end text-end text-red-600 text-sm px-6">
              <span>Need Help?</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
