import { Link, NavLink, useParams } from 'react-router-dom';
import { MdPeople, MdMusicVideo, MdEvent, MdSettings, MdOutlineComment, MdClose, MdAdd } from 'react-icons/md';
import Logo from '../../assets/images/white_logo.png'; // Asegúrate de que esta ruta sea correcta

const userGroups = [
  { id: 'pacto-cartagena', name: 'Pacto Cartagena', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzGQ2ZpdORlAn30CHcKeLewdnluzQZm5wrDQ&s'},
  { id: 'generacion-12', name: 'Generación 12', imageUrl: '' },
  { id: 'hillsong', name: 'Hillsong', imageUrl: ''},
];

function GroupAvatar({ group }) {
  if (group.imageUrl) {
    return <img src={group.imageUrl} alt={group.name} className="w-full h-full object-cover" />;
  }
  const initials = group.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  return (
    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
      <span className="font-bold text-white">{initials}</span>
    </div>
  );
}

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
  const { groupId } = useParams();
  const selectedGroup = userGroups.find(g => g.id === groupId) || userGroups[0];

  return (
    <aside 
      className={`
        h-full text-white flex z-40
        fixed inset-y-0 left-0 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* --- Columna 1: Selector de Grupos (sin logo) --- */}
      <div className="flex w-16 flex-col items-center space-y-6 bg-gray-900 p-1 pt-5">
        {userGroups.map((group) => (
          <NavLink 
            key={group.id} 
            to={`/groups/${group.id}/songs`}
            className={`
              h-9 w-9 shrink-0 overflow-hidden rounded-full 
              transition-all duration-200 ease-in-out
              hover:rounded-2xl
              ${selectedGroup.id === group.id ? 'rounded-2xl ring-2 ring-white' : ''}
            `}
          >
            <GroupAvatar group={group} />
          </NavLink>
        ))}
        <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-700 transition-all duration-200 ease-in-out hover:rounded-2xl hover:bg-green-500">
          <MdAdd size={24} />
        </button>
      </div>

      {/* --- Columna 2: Navegación Principal (con logo) --- */}
      <div className="w-64 p-4 flex flex-col bg-gray-800">
        {/* ✨ Logo movido aquí ✨ */}
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <Link to="/dashboard">
              <img src={Logo} alt="Sonety Logo" className="h-9" />
            </Link>
            {/* <h1 className="text-2xl font-bold mt-2">{selectedGroup.name}</h1> */}
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <MdClose size={24} />
            </button>
          </div>
        </div>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink to={`/groups/${selectedGroup.id}/events`} className={({ isActive }) => `flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-blue-600' : ''}`}>
                <MdEvent size={20} /> <span className="ml-3">Eventos</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/groups/${selectedGroup.id}/songs`} className={({ isActive }) => `flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-blue-600' : ''}`}>
                <MdMusicVideo size={20} /> <span className="ml-3">Canciones</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/groups/${selectedGroup.id}/members`} className={({ isActive }) => `flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-blue-600' : ''}`}>
                <MdPeople size={20} /> <span className="ml-3">Miembros</span>
              </NavLink>
            </li>
             <li>
              <NavLink to={`/groups/${selectedGroup.id}/messages`} className={({ isActive }) => `flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-blue-600' : ''}`}>
                <MdOutlineComment size={20} /> <span className="ml-3">Mensajes</span>
              </NavLink>
            </li>
             <li>
              <NavLink to={`/groups/${selectedGroup.id}/settings`} className={({ isActive }) => `flex items-center w-full p-3 rounded-lg hover:bg-gray-700 ${isActive ? 'bg-blue-600' : ''}`}>
                <MdSettings size={20} /> <span className="ml-3">Configuraciones</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}