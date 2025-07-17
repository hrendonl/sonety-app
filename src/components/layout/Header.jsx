import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/white_logo.png'
import { MdSettings, MdLogout, MdMenu, MdExpandMore } from 'react-icons/md';

function GroupAvatar({ group }) {
  if (group?.imageUrl) {
    return <img src={group.imageUrl} alt={group.name} className="h-full w-full object-cover" />;
  }
  const initials = group?.name?.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase() || '??';
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-700">
      <span className="font-bold text-sm text-white">{initials}</span>
    </div>
  );
}

export default function Header({ setSidebarOpen, user=null, currentGroup, userGroups = [] }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const groupDropdownRef = useRef(null);

  // Efecto para cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <header className="flex items-center col-span-2 row-start-1 justify-between p-4 bg-gray-800 text-white border-b border-gray-700">
      <div className="flex items-center">
        {/* Botón Hamburguesa para móvil */}
        <button 
          onClick={() => setSidebarOpen(true)}
          className="mr-4 text-white lg:hidden"
        >
          <MdMenu size={24} />
        </button>
        <div className="text-xl font-bold">
            <img className='h-8 lg:h-9' src={Logo} alt="" />
        </div>
      </div>

      {/* LADO DERECHO: Selector de Grupo y Menú de Usuario */}
      <div className="flex items-center gap-4">
        {/* --- Selector de Grupo --- */}
        <div className="relative" ref={groupDropdownRef}>
          <button onClick={() => setGroupDropdownOpen(!groupDropdownOpen)} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <GroupAvatar group={currentGroup} />
            </div>
            <span className="hidden font-semibold sm:inline">{currentGroup?.name || 'Seleccionar Grupo'}</span>
            <MdExpandMore size={20} className="hidden sm:inline" />
          </button>
          
          {groupDropdownOpen && (
            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-700 rounded-md shadow-lg z-50">
              <div className="p-2">
                {userGroups.map((group) => (
                  <Link
                    key={group.id}
                    to={`/groups/${group.id}/songs`} // Ajusta esta ruta según tu app
                    className="flex items-center w-full gap-3 px-3 py-2 text-sm text-gray-200 rounded-md hover:bg-gray-600"
                    onClick={() => setGroupDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <GroupAvatar group={group} />
                    </div>
                    <span>{group.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      {/* Menú de Usuario */}
      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="block hover:cursor-pointer">
          {user && user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="Avatar de usuario"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            // SVG por defecto si no hay imagen
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 w-48 mt-2 origin-top-right bg-gray-700 rounded-md shadow-lg z-50">
            <div className="py-1">
              <div className='px-4 py-2 border-b border-gray-600'>
                <p className='text-sm font-medium text-white'>Camilo Henao</p>
                <p className='text-xs text-gray-400'>camilo@correo.com</p>
              </div>
              <Link
                to="/settings"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                onClick={() => setDropdownOpen(false)}
              >
                <MdSettings className="mr-3" /> Configuración
              </Link>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
              >
                <MdLogout className="mr-3" /> Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </header>
  );
}




