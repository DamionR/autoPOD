import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <>
      <NotificationContainer />
      <AppRoutes />
    </>
  );
}

export default App;
