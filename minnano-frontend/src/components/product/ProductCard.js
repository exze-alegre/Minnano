import React from "react";
import Stars from "../miscellaneous/Stars";

const ProductCard = ({ product }) => {
  const rating = Math.round(product.average_rating);

  return (
    <div className="product-card max-w-sm rounded-lg hover:shadow-[0_0_10px_5px_rgba(169,169,169,0.3)] transition-all">
      <a href="#">
        <img
          src={product.primary_image || "https://via.placeholder.com/150"} // Use placeholder if no image is available
          alt={product.name}
          className="product-image rounded-t-lg"
        />
      </a>
      <div className="p-5">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.default_price}</p>
        <p>Rating: {product.average_rating}</p> <Stars rating={rating} />
      </div>
    </div>
  );
};

export default ProductCard;
