import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "Camilo Henao",
    email: "...",
    // imageUrl: "https://via.placeholder.com/40",
  };
  const currentGroup = {
    id: "pacto-cartagena",
    name: "Pacto Cartagena",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGQ2ZpdORlAn30CHcKeLewdnluzQZm5wrDQ&s",
  };
  const userGroups = [
    { id: "pacto-cartagena", name: "Pacto Cartagena", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGQ2ZpdORlAn30CHcKeLewdnluzQZm5wrDQ&s" },
    { id: "generacion-12", name: "Generación 12" },
  ];

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[auto_1fr] min-h-0">
      <Header
        setSidebarOpen={setSidebarOpen}
        user={user}
        currentGroup={currentGroup}
        userGroups={userGroups}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="row-start-2 col-start-2 overflow-y-auto bg-gray-900 lg:p-6 p-4 min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
