import { Link } from "react-router-dom";
import {
  MdPlayArrow,
  MdPause,
  MdMoreVert,
  MdControlPoint,
  MdOutlineVisibility,
} from "react-icons/md";
import { getImageYoutube } from "../../../utils/getImageYoutube";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppProvider";
import { deleteSong } from "../../../api/songApi";

// --- Helper para formatear la duración ---
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// --- Placeholder para la imagen ---
function SongPlaceholder() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-700 sm:h-14 sm:w-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
}

export default function SongItem({ song, refetch }) {
  const { playSong, isPlaying, currentSong, togglePlay, setApp } =
    useContext(AppContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handlePlay = () => {
    playSong(song);
  };

  const handleToggle = () => {
    togglePlay();
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Borrar "${song.title}"?`)) {
      await deleteSong(song.id);
      await refetch();
    }
  };

  const getIsCurrentlyPlaying = () => {
    return isPlaying && song.id === currentSong?.id;
  };

  const handleMovil = async () => {
    setDropdownOpen(false);
    await setApp("SET_IS_PLAYING", false);
    if (getIsCurrentlyPlaying()) {
      handleToggle();
    } else {
      handlePlay();
    }
  };

  const handleDesktop = async () => {
    await setApp("SET_IS_PLAYING", false);
    if (getIsCurrentlyPlaying()) {
      handleToggle();
    } else {
      handlePlay();
    }
  };

  // Guardamos el estado para no llamar la función múltiples veces en el render
  const isCurrentlyPlaying = getIsCurrentlyPlaying();

  return (
    <div
      // AQUI se añade la clase 'group' al contenedor principal
      className={`rounded-lg p-3 sm:p-4 ${
        isCurrentlyPlaying ? "bg-app-surface-hover" : "bg-app-surface"
      } group hover:bg-app-surface-hover flex items-center justify-between md:grid md:grid-cols-[1fr_repeat(3,minmax(0,90px))_minmax(0,140px)] md:gap-4`}
    >
      {/* Columna 1: Info de la Canción */}
      <div className="flex min-w-0 flex-grow items-center gap-4">
        <div className="relative shrink-0"> {/* Se quitó 'group' de aquí */}
          {/* Imagen o Placeholder */}
          {song.youtube_url ? (
            <img
              src={getImageYoutube(song.youtube_url)}
              alt={song.title}
              className="h-12 w-12 shrink-0 rounded-md object-cover sm:h-14 sm:w-14"
            />
          ) : (
            <SongPlaceholder />
          )}

          {/* El botón de Play/Pause ahora usa 'group-hover' del componente padre */}
          <button
            onClick={handleDesktop}
            className={`absolute inset-0 z-10 flex items-center justify-center rounded-md bg-[#0000009e] transition-all duration-100
              ${
                isCurrentlyPlaying
                  ? "bg-opacity-40" // Si está sonando: fondo semitransparente SIEMPRE visible.
                  : "bg-opacity-0 opacity-0 group-hover:bg-opacity-40 group-hover:opacity-100" // Si no está sonando: invisible por defecto, aparece en hover del 'SongItem' padre.
              }`}
            aria-label={isCurrentlyPlaying ? "Pausar" : "Reproducir"}
          >
            {isCurrentlyPlaying ? (
              <MdPause className="text-white" size={32} />
            ) : (
              <MdPlayArrow className="text-white" size={32} />
            )}
          </button>
        </div>

        <div className="min-w-0 flex-grow">
          <p
            className={`truncate font-bold ${
              isCurrentlyPlaying ? "text-app-accent" : "text-white"
            }`}
          >
            {song.title}
          </p>
          <p className="truncate text-sm text-app-subtext">
            {song.artist.name}
          </p>
        </div>
      </div>

      {/* Columnas 2, 3 y 4: Detalles (Tono, Tempo, Duración) */}
      <div className="hidden md:contents">
        <p className="font-semibold text-gray-300 text-center">
          {song.key_chord}
        </p>
        <p className="font-semibold text-gray-300 text-center">
          {song.tempo_BPM} bpm
        </p>
        <p className="font-semibold text-gray-300 text-center">
          {song.duration}
        </p>
      </div>

      {/* Columna 5: Acciones */}
      <div className="flex shrink-0 justify-end">
        {/* VISTA DESKTOP: Botones individuales */}
        <div className="hidden lg:flex items-center gap-1 text-app-subtext sm:gap-2">
          <Link
            to={`/groups/${song.group_id}/songs/${song.id}/lyrics`}
            className="rounded-full p-2 hover:bg-app-button-bg hover:text-white"
            title="Ver Letra"
          >
            <MdControlPoint size={22} />
          </Link>
        </div>

        {/* VISTA MÓVIL Y TABLET: Menú Desplegable */}
        <div className="relative lg:hidden" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="rounded-full p-2 text-gray-300 hover:bg-app-button-bg hover:text-white"
            title="Más opciones"
          >
            <MdMoreVert size={22} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 bottom-full mt-2 w-48  origin-bottom-right rounded-md bg-app-surface-hover shadow-lg z-20">
              <div className="py-1">
                <button
                  onClick={handleMovil}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-app-button-bg"
                >
                  {isCurrentlyPlaying ? (
                    <MdPause className="mr-3" />
                  ) : (
                    <MdPlayArrow className="mr-3" />
                  )}
                  {isCurrentlyPlaying ? "Pausar" : "Reproducir"}
                </button>
                <Link
                  to={`/groups/${song.group_id}/songs/${song.id}/lyrics`}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-app-button-bg"
                  onClick={() => setDropdownOpen(false)}
                >
                  <MdControlPoint className="mr-3" /> Ver Letra
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}