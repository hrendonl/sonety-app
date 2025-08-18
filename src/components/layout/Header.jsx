import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/white_logo.png";
import { MdSettings, MdLogout, MdMenu } from "react-icons/md";
import { AppContext } from "../../context/AppProvider";

export default function Header({
  setSidebarOpen,
  currentGroup,
  userGroups = [],
}) {
  const { user, logout } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    logout();
  };

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
    <header className="flex items-center col-span-2 row-start-1 justify-between bg-transparent text-white">
      <div className="flex items-center">
        {/* Botón Hamburguesa para móvil */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mr-4 text-white lg:hidden"
        >
          <MdMenu size={24} />
        </button>
        <h1 className="lg:text-2xl text-2xl font-bold">Canciones</h1>
      </div>

      {/* Menú de Usuario */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="block hover:cursor-pointer"
        >
          {user && user.image != "string" ? (
            <img
              src={user.image}
              alt="Avatar de usuario"
              className="lg:w-9 lg:h-9 h-8 w-8 rounded-full object-cover"
            />
          ) : (
            // SVG por defecto si no hay imagen
            <div className="lg:w-9 lg:h-9 h-8 w-8 rounded-full bg-app-surface-hover flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-app-subtext"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 w-48 mt-2 origin-top-right bg-app-surface-hover rounded-md shadow-lg z-50">
            <div className="py-1">
              <div className="px-4 py-2 border-b border-gray-600">
                <p className="text-sm font-medium text-white">
                  {user.fullname}
                </p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <Link
                to="/settings"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                onClick={() => setDropdownOpen(false)}
              >
                <MdSettings className="mr-3" /> Configuración
              </Link>
              <Link
                to="/"
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
              >
                <MdLogout className="mr-3" /> Cerrar Sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
