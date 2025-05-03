import React from "react";
import { useNotifications } from "../../context/NotificationContext";
import Notification from "./Notification";
import "./Notification.css";

const NotificationContainer = ({ position = "top-right" }) => {
  const { notifications, removeNotification } = useNotifications();

  // Sort notifications by timestamp so newer notifications appear on top
  const sortedNotifications = [...notifications].sort(
    (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
  );

  const containerClass = `notification-container notification-container-${position}`;

  return (
    <div className={containerClass} aria-live="polite">
      {sortedNotifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onRemove={removeNotification}
          callback={notification.callback}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
