import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import Qrcode from "../../assets/global/Rickrolling_QR_code.png";
import "../../styles/components/global/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="flex justify-evenly mx-auto">
        <div className="flex flex-col items-start">
          <small className="font-semibold">Customer Service</small>
          <small>Help Center</small>
          <small>Payment Method</small>
          <small>Order Tracking</small>
          <small>Shipping</small>
        </div>
        <div className="flex flex-col items-start">
          <small className="font-semibold">About MINNANO</small>
          <small>About Us</small>
          <small>Email</small>
          <small>MINNANO Policies</small>
          <small>Terms & Conditions</small>
        </div>
        <div className="flex flex-col items-start">
          <small className="font-semibold">Follow Us</small>
          <div className="flex flex-col">
            <small className="flex items-center py-auto">
              <FaFacebookSquare className="inline mr-2" />
              Facebook
            </small>
            <small className="flex items-center py-auto">
              <FaInstagram className="inline mr-2" />
              Instagram
            </small>
            <small className="flex items-center py-auto">
              <FaTwitter className="inline mr-2" />X
            </small>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <small className="font-semibold">App Download</small>

          {/* Flex container for QR code and Playstore */}
          <div className="flex items-start space-x-4">
            <img src={Qrcode} alt="QrCode" className="h-20" />

            {/* Flex container to stack Playstore items vertically and align to top */}
            <div className="flex flex-col justify-start space-y-2">
              <small className="bg-gray-300 px-2 flex items-center">
                <IoLogoGooglePlaystore className="inline mr-2" />
                Playstore
              </small>
              <small className="bg-gray-300 px-2 flex items-center">
                <FaApple className="inline mr-2" />
                App Store
              </small>
            </div>
          </div>
        </div>
      </div>
      <hr class="border-t-2 border-gray-300 my-2 mx-20" />
      <div className="flex justify-center gap-5">
        <small>© 2024 MINNANO. All Rights Reserved .</small>
        <small>Checkout: https://github.com/exze-alegre/Minnano</small>
        <small>
          Country & Region: <span className="underline">Singapore</span>{" "}
          <span className="underline">Indonesia</span>{" "}
          <span className="underline">Thailand</span>{" "}
          <span className="underline">Malaysia</span>{" "}
          <span className="underline">Vietnam</span>{" "}
          <span className="underline">Philippines</span>{" "}
          <span className="underline">Brazil</span>{" "}
          <span className="underline">México</span>{" "}
          <span className="underline">Colombia</span>{" "}
          <span className="underline">Chile</span>{" "}
          <span className="underline">Taiwan</span>
        </small>
      </div>
    </div>
  );
};

export default Footer;
