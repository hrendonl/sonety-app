import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AudioPlayer from "./AudioPlayer";
import Header from "./Header";
import { AppContext } from "../../context/AppProvider";

export default function DashboardLayout() {
  const { setApp } = useContext(AppContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen bg-gray-900">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 pb-32 lg:pl-8 lg:pr-8 lg:pb-24 space-y-8">
          <Header setSidebarOpen={setSidebarOpen} />
          <Outlet />
        </main>
      </div>
      <AudioPlayer />
    </>
  );
}
