import React, { createContext, useContext, useReducer } from "react";

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} type
 * @property {string} message
 * @property {string} [title]
 * @property {number} [timeOut]
 * @property {Function} [callback]
 * @property {number} [timestamp]
 */

/**
 * @typedef {Object} NotificationContextValue
 * @property {Notification[]} notifications
 * @property {(message: string, title?: string, timeOut?: number, callback?: Function) => string} showInfo
 * @property {(message: string, title?: string, timeOut?: number, callback?: Function) => string} showSuccess
 * @property {(message: string, title?: string, timeOut?: number, callback?: Function) => string} showWarning
 * @property {(message: string, title?: string, timeOut?: number, callback?: Function) => string} showError
 * @property {(notification: Partial<Notification> & { type: string }) => string} addNotification
 * @property {(id: string) => void} removeNotification
 */

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, action.notification];
    case "REMOVE_NOTIFICATION":
      return state.filter((notification) => notification.id !== action.id);
    default:
      return state;
  }
};

/**
 * NotificationProvider manages notification state and provides notification methods.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  /**
   * Show an info notification.
   */
  const showInfo = (message, title, timeOut = 3000, callback) =>
    addNotification({ type: "info", message, title, timeOut, callback });
  /**
   * Show a success notification.
   */
  const showSuccess = (message, title, timeOut = 3000, callback) =>
    addNotification({ type: "success", message, title, timeOut, callback });
  /**
   * Show a warning notification.
   */
  const showWarning = (message, title, timeOut = 3000, callback) =>
    addNotification({ type: "warning", message, title, timeOut, callback });
  /**
   * Show an error notification.
   */
  const showError = (message, title, timeOut = 5000, callback) =>
    addNotification({ type: "error", message, title, timeOut, callback });

  /**
   * Add a custom notification (for extensibility).
   * @param {Partial<Notification> & { type: string }} notification
   * @returns {string} notification id
   */
  const addNotification = (notification) => {
    const id = Math.random().toString(36).substring(2, 9);
    dispatch({
      type: "ADD_NOTIFICATION",
      notification: { ...notification, id, timestamp: Date.now() },
    });
    if (notification.timeOut) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.timeOut);
    }
    return id;
  };

  /**
   * Remove a notification by id.
   * @param {string} id
   */
  const removeNotification = (id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", id });
  };

  /** @type {NotificationContextValue} */
  const value = {
    notifications,
    showInfo,
    showSuccess,
    showWarning,
    showError,
    addNotification,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * useNotifications provides access to the NotificationContext.
 * Throws if used outside the provider.
 * @returns {NotificationContextValue}
 */
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
