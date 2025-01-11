import React from "react";
import { FaStar } from "react-icons/fa";
import "../../styles/components/miscellaneous/Stars.css";

const Stars = ({ rating, totalStars = 5 }) => {
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      i <= rating ? (
        <FaStar key={i} className="filled-star" />
      ) : (
        <FaStar key={i} className="empty-star" />
      )
    );
  }

  return <div className="star-icons">{stars}</div>;
};

export default Stars;
