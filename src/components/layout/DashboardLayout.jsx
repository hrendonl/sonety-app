import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
   <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[auto_1fr] min-h-0">
        <Header setSidebarOpen={setSidebarOpen} />
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="row-start-2 col-start-2 overflow-y-auto bg-gray-900 lg:p-6 p-4 min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
