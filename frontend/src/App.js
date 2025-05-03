import React from "react";
import Header from "./ui/Header";
import Sidebar from "./ui/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { NotificationContainer } from "./ui/Notification";

function App() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 bg-zinc-50">
          <AppRoutes />
        </main>
      </div>
      <NotificationContainer />
    </>
  );
}

export default App;
