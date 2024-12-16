import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all the pages
import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotificationPage from "./pages/NotificationPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetails from "./pages/OrderDetails";
import Orders from "./pages/Orders";
import ProductPage from "./pages/ProductPage";
import RecentlyViewed from "./pages/RecentlyViewed";
import SearchResults from "./pages/SearchResults";
import Settings from "./pages/Settings";
import User from "./pages/User";
import Wishlist from "./pages/Wishlist";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order/:orderGroupId" element={<OrderDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/recently-viewed" element={<RecentlyViewed />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user" element={<User />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
