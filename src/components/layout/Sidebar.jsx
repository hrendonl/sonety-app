import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/white_logo.png'
import { MdPeople, MdMusicVideo, MdEvent, MdSettings, MdOutlineComment, MdClose } from 'react-icons/md';

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
 const baseLinkClasses = "flex items-center w-full p-3 text-gray-300 rounded-lg hover:bg-gray-700";
  const activeLinkClasses = "bg-blue-600 text-white";

  return (
    <aside 
      className={`
        h-full w-64 p-4 text-white bg-gray-800 flex flex-col fixed inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:h-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex items-center justify-between mb-10">
        {isSidebarOpen && <img className='h-8' src={Logo} alt="" />}
        <button onClick={() => setSidebarOpen(false)} className="md:hidden">
          <MdClose size={24} />
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              <MdEvent size={20} />
              <span className="ml-3">Eventos</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/songs"
              className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              <MdMusicVideo size={20} />
              <span className="ml-3">Canciones</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/members"
              className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              <MdPeople size={20} />
              <span className="ml-3">Miembros</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/messages"
              className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              <MdOutlineComment size={20} />
              <span className="ml-3">Mensajes</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
            >
              <MdSettings size={20} />
              <span className="ml-3">Configuraciones</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}