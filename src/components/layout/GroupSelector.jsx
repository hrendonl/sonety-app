import { useQuery } from "@tanstack/react-query";
import { MdAdd } from "react-icons/md";
import GroupAvatar from "./GroupAvatar";
import { getUserGroups } from "../../api/groupApi";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { NavLink } from "react-router-dom";

export default function GroupSelector() {
  const { user, groupSelected, setApp } = useContext(AppContext);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: () => getUserGroups(user.id).then((res) => res.data),
    keepPreviousData: true,
  });

  return (
    // Contenedor principal. El padding 'p-3' es clave para el espacio.
    <div className="flex flex-col items-center space-y-4 bg-gray-900 p-3">
      {data?.list.map((group) => (
        // Contenedor de cada item. 'relative' es el contexto para el indicador.
        <div key={group.id} className="relative">
          
          {/* === INDICADOR DE SELECCIÓN === */}
          {/* Se muestra solo si el grupo está seleccionado */}
          {groupSelected.id === group.id && (
            <div
              className="absolute -left-3 top-0 h-full w-1 rounded-full bg-white"
              aria-hidden="true"
            />
          )}

          <NavLink
            onClick={() => setApp("SET_GROUP_SELECTED", group)}
            to={`/groups/${group.name.replaceAll(" ", "-")}/songs`}
            title={group.name} // Tooltip para accesibilidad
          >
            {/* === CONTENEDOR DEL AVATAR === */}
            {/* Ahora es un cuadrado con bordes redondeados por defecto */}
            <div
              className="
                h-10 w-10 shrink-0 overflow-hidden rounded-xl
                bg-gray-700 transition-all duration-200 
                " // Efecto sutil al pasar el mouse
            >
              <GroupAvatar group={group} />
            </div>
          </NavLink>
        </div>
      ))}

      {/* Separador */}
      <div className="h-px w-8 bg-gray-700" />

      {/* === BOTÓN DE AÑADIR === */}
      <button 
        className="flex h-10 w-10 shrink-0 items-center justify-center  bg-gray-400 text-gray-700 transition-all duration-200 rounded-xl hover:bg-green-500 hover:text-white"
        title="Añadir un grupo"
      >
        <MdAdd size={30} />
      </button>
    </div>
  );
}