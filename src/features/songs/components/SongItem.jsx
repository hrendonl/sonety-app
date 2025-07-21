import { Link } from 'react-router-dom';
import { MdPlayArrow, MdArticle, MdDelete, MdPause} from 'react-icons/md';
import { getImageYoutube } from '../../../utils/getImageYoutube';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppProvider';

// --- Helper para formatear la duración ---
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// --- Placeholder para la imagen ---
function SongPlaceholder() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-700 sm:h-14 sm:w-14">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

export default function SongItem({ song }) {
  const { playSong, isPlaying, currentSong, togglePlay} = useContext(AppContext)
  const handlePlay = () => {
    playSong(song);
  };

  const handleToggle = () => {
    togglePlay()
  }


  const handleDelete = () => {
    if (window.confirm(`¿Borrar "${song.title}"?`)) {
      console.log(`Borrando canción con id ${song.id}`);
    }
  };

  return (
    <div className={`flex flex-col gap-4 rounded-lg ${isPlaying && song.id == currentSong.id ? 'bg-[#384456]' : 'bg-gray-800'}  hover:bg-[#384456] p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4`}>
      {/* Sección Principal: Imagen y Título */}
      <div className="flex flex-grow items-center gap-4">
        {song.url_youtube != "" ? (
          <img src={getImageYoutube(song.url_youtube)} alt={song.title} className="h-12 w-12 rounded-md object-cover sm:h-14 sm:w-14" />
        ) : (
          <SongPlaceholder />
        )}
        <div className="flex-grow">
          <p className={`${isPlaying && song.id == currentSong.id ? "text-blue-400" : "text-white"} font-bold`}>{song.title}</p>
          <p className="text-sm text-gray-400">{song.artist.name}</p>
        </div>
      </div>

      {/* Detalles Adicionales y Acciones */}
      <div className="ml-0 flex items-center justify-between gap-2 sm:ml-4 sm:justify-end sm:gap-4">
        {/* Detalles para Desktop */}
        <div className="hidden items-center gap-4 text-center md:flex">
          <div>
            <p className="text-xs text-gray-300">Tono</p>
            <p className="font-semibold text-white">{song.tone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-300">Tempo</p>
            <p className="font-semibold text-white">{song.tempo} bpm</p>
          </div>
          {/* ✨ AQUÍ ESTÁ EL CAMBIO ✨ */}
          <div>
            <p className="text-xs text-gray-300">Duración</p>
            <p className="font-semibold text-white">{song.duration}</p>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center gap-1 text-gray-300 sm:gap-2">
          <button onClick={isPlaying ? handleToggle : handlePlay} className="rounded-full p-2 hover:bg-gray-600 hover:text-white" title="Reproducir">
            {isPlaying && song.id == currentSong.id ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
          </button>
          <Link to={`/songs/${song.id}/lyrics`} className="rounded-full p-2 hover:bg-gray-600 hover:text-white" title="Ver Letra">
            <MdArticle size={22} />
          </Link>
          <button onClick={handleDelete} className="rounded-full p-2 hover:bg-gray-600 hover:text-white" title="Borrar">
            <MdDelete size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}