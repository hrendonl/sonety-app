import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Logo from '../../assets/images/white_logo.png'
import { MdPeople, MdMusicVideo, MdEvent, MdSettings, MdOutlineComment, MdClose, MdAdd } from 'react-icons/md';

// Datos de ejemplo: 'Generación 12' no tiene imagen para probar el SVG por defecto
const userGroups = [
  { id: 'pacto-cartagena', name: 'Pacto Cartagena'},
  { id: 'generacion-12', name: 'Generación 12' }, // Sin imageUrl
  { id: 'hillsong', name: 'Hillsong'},
];

// 1. Nuevo componente para el avatar del grupo
function GroupAvatar({ group }) {
  if (group.imageUrl) {
    return <img src={group.imageUrl} alt={group.name} className="w-full h-full object-cover" />;
  }

  // Genera las iniciales del grupo (ej. "Pacto Cartagena" -> "PC")
  const initials = group.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
  
  return (
    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
      <span className="font-bold text-white">{initials}</span>
    </div>
  );
}


export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
  const { groupId } = useParams();
  const [selectedGroupId, setSelectedGroupId] = useState(groupId || userGroups[0].id);

  const baseLinkClasses = "flex items-center w-full p-3 text-gray-300 rounded-lg hover:bg-gray-700";
  const activeLinkClasses = "bg-blue-600 text-white";

  return (
    <aside 
      className={`h-full text-white bg-gray-800 flex fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* --- Columna 1: Selector de Grupos --- */}
      <div className="flex flex-col items-center w-20 p-2 pt-4 bg-gray-900 space-y-2">
        {/* <NavLink to="/dashboard" className="mb-4">
            <img className='h-10 w-10 object-cover' src={Logo} alt="Logo Principal" />
        </NavLink> */}
        {userGroups.map((group) => (
          <button 
            key={group.id} 
            onClick={() => setSelectedGroupId(group.id)}
            className={`w-12 h-12 rounded-full overflow-hidden transition-all duration-200 ${selectedGroupId === group.id ? 'ring-2 ring-white rounded-lg' : 'hover:rounded-lg'}`}
          >
            {/* 2. Usar el nuevo componente Avatar */}
            <GroupAvatar group={group} />
          </button>
        ))}
        <button className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full hover:bg-green-500 hover:rounded-lg transition-all duration-200">
          <MdAdd size={24} />
        </button>
      </div>

      {/* --- Columna 2: Navegación Principal --- */}
      <div className="w-64 p-4 flex flex-col">
        {isSidebarOpen && <div className="flex items-center justify-between mb-10">
          <img className='h-8' src={Logo} alt="" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <MdClose size={24} />
          </button>
        </div>}
        <h2 className="text-xl font-bold mb-5 mt-3 pl-2">
            {userGroups.find(g => g.id === selectedGroupId)?.name}
          </h2>
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
              to="/groups/pacto-cartagena/songs"
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
      </div>
    </aside>
  );
}