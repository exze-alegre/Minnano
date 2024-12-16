import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBasket, FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import "../../styles/components/global/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="navbar">
      <nav className="bg-white border-b shadow-md px-20">
        <div className="max-w-screen-xl mx-auto pt-4 pb-3">
          <div className="grid grid-cols-[2fr,8fr,2fr] items-center gap-4 mb-3">
            {/* Logo Section */}
            <div className="">
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
            {/* Center Section */}
            <div className="flex-grow mx-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 rounded-md border-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:border-red-200"
                  placeholder="Search..."
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500">
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-wrap gap-5 text-right items-center justify-center">
              <span
                onClick={handleSignup}
                className="cursor-pointer text-lg font-semibold"
              >
                Sign up
              </span>
              <span className="cursor-pointer text-4xl">
                <FaShoppingBasket />
              </span>
              <span className="cursor-pointer text-4xl">
                <FaRegHeart />
              </span>
            </div>
          </div>
          <div className="category flex gap-20 items-center font-bold justify-center text-lg text-center ">
            <span>NEW</span>
            <span>BEST SELLER</span>
            <span>TRENDING</span>
            <span>PLUSHIES</span>
            <span>KEYCHAINS</span>
            <span>CROCHET</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
