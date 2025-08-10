import {
  MdPeople,
  MdMusicVideo,
  MdEvent,
  MdSettings,
  MdOutlineComment,
  MdClose,
  MdPeopleOutline,
  MdOutlineSettings
} from "react-icons/md";
import Logo from "../../assets/images/logo_prev.png";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

export default function NavMain({ setSidebarOpen }) {
  const { groupSelected } = useContext(AppContext);
  const itemsMenu = [
    { name: "events", label: "Eventos", icon: <MdEvent size={20} /> },
    { name: "songs", label: "Canciones", icon: <MdMusicVideo size={20} /> },
    { name: "members", label: "Miembros", icon: <MdPeopleOutline size={20} /> },
    {
      name: "messages",
      label: "Mensajes",
      icon: <MdOutlineComment size={20} />,
    },
    {
      name: "settings",
      label: "Configuraciones",
      icon: <MdOutlineSettings size={20} />,
    },
  ];

  return (
    <div className="w-52 p-4 flex flex-col bg-gray-900">
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
                  `flex items-center w-full p-3 rounded-lg font-bold ${
                    isActive ? "bg-gray-700 hover:bg-gray-700 text-white hover:text-white" : "hover:bg-gray-900 text-gray-500 hover:text-white"
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
