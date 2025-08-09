import {
  MdPeople,
  MdMusicVideo,
  MdEvent,
  MdSettings,
  MdOutlineComment,
  MdClose,
} from "react-icons/md";
import Logo from "../../assets/images/white_logo.png";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

export default function NavMain({ setSidebarOpen }) {
  const { groupSelected } = useContext(AppContext);
  const itemsMenu = [
    { name: "events", label: "Eventos", icon: <MdEvent size={20} /> },
    { name: "songs", label: "Canciones", icon: <MdMusicVideo size={20} /> },
    { name: "members", label: "Miembros", icon: <MdPeople size={20} /> },
    {
      name: "messages",
      label: "Mensajes",
      icon: <MdOutlineComment size={20} />,
    },
    {
      name: "settings",
      label: "Configuraciones",
      icon: <MdSettings size={20} />,
    },
  ];

  return (
    <div className="w-64 p-4 flex flex-col bg-gray-800">
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <Link to="/dashboard">
            <img src={Logo} alt="Sonety Logo" className="h-9" />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <MdClose size={24} />
          </button>
        </div>
      </div>

      <nav>
        <ul className="space-y-2">
          {itemsMenu.map((item) => (
            <li>
              <NavLink
                to={`/groups/${groupSelected.name.replaceAll(" ", "-")}/${
                  item.name
                }`}
                className={({ isActive }) =>
                  `flex items-center w-full p-3 rounded-lg  hover:text-white text-gray-400 ${
                    isActive ? "bg-blue-600 hover:bg-blue-500 text-white" : "hover:bg-gray-700"
                  }`
                }
              >
                {item.icon} <span className="ml-3">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
