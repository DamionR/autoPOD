import React, { useEffect, useState } from "react";
import "./Notification.css";

/**
 * Notification component for displaying alerts.
 * @param {Object} props
 * @param {string} props.id - Notification ID
 * @param {string} [props.type] - Notification type ('info' | 'success' | 'warning' | 'error')
 * @param {string} [props.title] - Notification title
 * @param {string} [props.message] - Notification message
 * @param {function} [props.onRemove] - Remove callback
 * @param {function} [props.callback] - Click callback
 * @param {number} [props.timeOut] - Auto-dismiss timeout
 * @param {JSX.Element} [props.icon] - Custom icon
 * @returns {JSX.Element}
 */
const Notification = ({
  id,
  type = "info",
  title,
  message,
  onRemove,
  callback,
  timeOut = 5000,
  icon,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Enter animation
    setTimeout(() => setIsVisible(true), 10);

    // Set up automatic dismiss if timeOut is provided
    if (timeOut && timeOut > 0) {
      const timer = setTimeout(() => dismissNotification(), timeOut);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissNotification = () => {
    setIsLeaving(true);
    setTimeout(() => {
      if (onRemove) onRemove(id);
    }, 300); // Match this with CSS transition duration
  };

  const handleClick = () => {
    if (callback) callback();
    dismissNotification();
  };

  const getIcon = () => {
    if (icon) return React.cloneElement(icon, { "aria-hidden": true });
    switch (type) {
      case "success":
        return (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const notificationClass = `notification notification-${type} ${
    isVisible ? "visible" : ""
  } ${isLeaving ? "leaving" : ""}`;

  return (
    <div
      className={notificationClass}
      onClick={handleClick}
      role="alert"
      tabIndex={0}
      aria-live="assertive"
    >
      <div className="notification-icon">{getIcon()}</div>
      <div className="notification-content">
        {title && <h4 className="notification-title">{title}</h4>}
        <div className="notification-message">{message}</div>
      </div>
      <button
        type="button"
        className="notification-dismiss"
        onClick={(e) => {
          e.stopPropagation();
          dismissNotification();
        }}
        aria-label="Close notification"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Dismiss notification</span>
      </button>
    </div>
  );
};

export default Notification;
