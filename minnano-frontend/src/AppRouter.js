import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all the pages
import Basket from "./Basket";
import Checkout from "./Checkout";
import Error from "./Error";
import Home from "./Home";
import Login from "./Login";
import NotificationPage from "./NotificationPage";
import OrderConfirmation from "./OrderConfirmation";
import OrderDetails from "./OrderDetails";
import Orders from "./Orders";
import ProductPage from "./ProductPage";
import RecentlyViewed from "./RecentlyViewed";
import SearchResults from "./SearchResults";
import Settings from "./Settings";
import User from "./User";
import Wishlist from "./Wishlist";

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

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
