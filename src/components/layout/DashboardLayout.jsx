import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AudioPlayer from "./AudioPlayer";
import Header from "./Header"

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen bg-gray-900">
        {/* El Sidebar se encarga de su propia visibilidad y posicionamiento */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* El contenido principal ahora crece para ocupar el espacio restante */}
        <main className="flex-1 overflow-y-auto p-4 pb-32 lg:pl-10 lg:pr-10 lg:pb-24 space-y-8">
          <Header />
          <Outlet />
        </main>
      </div>

      {/* El Player se mantiene fijo en la parte inferior */}
      <AudioPlayer />
    </>
  );
}
