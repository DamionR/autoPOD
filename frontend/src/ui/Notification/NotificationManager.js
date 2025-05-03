/**
 * A utility class to manage notifications across the application
 * This provides a simple API similar to the react-notifications library
 */

let notificationContext = null;

export const setNotificationContext = (context) => {
  notificationContext = context;
};

const checkContext = () => {
  if (!notificationContext) {
    console.error(
      "NotificationManager: Context not set. Call setNotificationContext first."
    );
    return false;
  }
  return true;
};

const NotificationManager = {
  /**
   * Show an info notification
   * @param {string} message - The notification message
   * @param {string} [title] - Optional title
   * @param {number} [timeOut=3000] - Time in ms before notification disappears
   * @param {Function} [callback] - Optional callback when notification is clicked
   * @param {boolean} [priority=false] - If true, the notification appears at the top
   * @returns {string} Notification ID
   */
  info: (message, title, timeOut = 3000, callback, priority = false) => {
    if (!checkContext()) return null;
    return notificationContext.showInfo(message, title, timeOut, callback);
  },

  /**
   * Show a success notification
   * @param {string} message - The notification message
   * @param {string} [title] - Optional title
   * @param {number} [timeOut=3000] - Time in ms before notification disappears
   * @param {Function} [callback] - Optional callback when notification is clicked
   * @param {boolean} [priority=false] - If true, the notification appears at the top
   * @returns {string} Notification ID
   */
  success: (message, title, timeOut = 3000, callback, priority = false) => {
    if (!checkContext()) return null;
    return notificationContext.showSuccess(message, title, timeOut, callback);
  },

  /**
   * Show a warning notification
   * @param {string} message - The notification message
   * @param {string} [title] - Optional title
   * @param {number} [timeOut=3000] - Time in ms before notification disappears
   * @param {Function} [callback] - Optional callback when notification is clicked
   * @param {boolean} [priority=false] - If true, the notification appears at the top
   * @returns {string} Notification ID
   */
  warning: (message, title, timeOut = 3000, callback, priority = false) => {
    if (!checkContext()) return null;
    return notificationContext.showWarning(message, title, timeOut, callback);
  },

  /**
   * Show an error notification
   * @param {string} message - The notification message
   * @param {string} [title] - Optional title
   * @param {number} [timeOut=5000] - Time in ms before notification disappears
   * @param {Function} [callback] - Optional callback when notification is clicked
   * @param {boolean} [priority=false] - If true, the notification appears at the top
   * @returns {string} Notification ID
   */
  error: (message, title, timeOut = 5000, callback, priority = false) => {
    if (!checkContext()) return null;
    return notificationContext.showError(message, title, timeOut, callback);
  },

  /**
   * Remove a notification by ID
   * @param {string} id - The notification ID to remove
   */
  remove: (id) => {
    if (!checkContext() || !id) return;
    notificationContext.removeNotification(id);
  },
};

export default NotificationManager;
