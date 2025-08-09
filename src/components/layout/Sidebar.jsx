import { Link, NavLink, useParams } from "react-router-dom";
import GroupSelector from "./GroupSelector";
import NavMain from "./NavMain";

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
  return (
    <aside
      className={`
        h-full text-white flex z-40
        fixed inset-y-0 left-0 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <GroupSelector />
      <NavMain setSidebarOpen={setSidebarOpen}/>
    </aside>
  );
}
