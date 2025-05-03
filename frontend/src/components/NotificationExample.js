import React from "react";
import { NotificationManager } from "../ui/Notification";

const NotificationExample = () => {
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("This is an information message", "Info");
          break;
        case "success":
          NotificationManager.success(
            "Operation completed successfully",
            "Success"
          );
          break;
        case "warning":
          NotificationManager.warning(
            "This is a warning message",
            "Warning",
            5000
          );
          break;
        case "error":
          NotificationManager.error("An error occurred", "Error", 0, () => {
            alert("Error notification clicked!");
          });
          break;
        default:
          break;
      }
    };
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Notification Examples
      </h2>

      <div className="space-y-4">
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={createNotification("info")}
        >
          Info Notification
        </button>

        <button
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          onClick={createNotification("success")}
        >
          Success Notification
        </button>

        <button
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          onClick={createNotification("warning")}
        >
          Warning Notification
        </button>

        <button
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          onClick={createNotification("error")}
        >
          Error Notification
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        Click on any button to trigger a notification. The error notification
        has a callback that will trigger when you click on it.
      </p>
    </div>
  );
};

export default NotificationExample;
