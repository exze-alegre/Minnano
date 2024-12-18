import React from "react";
import "../../styles/components/global/Notification.css";

const Notification = ({ notification }) => {
  return (
    <div className="notification">
      {notification.map((notification) => (
        <div key={notification.id} className="notif-text">
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
