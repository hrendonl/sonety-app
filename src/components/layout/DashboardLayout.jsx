// src/components/layout/DashboardLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Se define un grid de 2 filas y 2 columnas
   <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[auto_1fr] min-h-0">
      {/* Header ocupa toda la parte superior */}
      <header className="col-span-2 row-start-1">
        <Header setSidebarOpen={setSidebarOpen} />
      </header>

      {/* Sidebar ocupa la primera columna, se estira verticalmente */}
      <aside className="row-start-2 col-start-1 h-full overflow-y-auto bg-gray-800">
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      </aside>

      {/* Contenido principal */}
      <main className="row-start-2 col-start-2 overflow-y-auto bg-gray-900 p-6 min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
