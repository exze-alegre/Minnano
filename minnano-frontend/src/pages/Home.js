import React, { useEffect, useState } from "react";
import Navbar from "../components/global/Navbar";
import ProductCard from "../components/product/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products/homepage"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching homepage products: ", error);
      }
    };
    fetchProducts();
  });

  return (
    <div className="home">
      <Navbar />
      <div className="product-list">
        <h2>Featured Products</h2>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={products.product_id} product={product} />
          ))
        ) : (
          <div className="gay"></div>
        )}
      </div>
    </div>
  );
};

export default Home;
