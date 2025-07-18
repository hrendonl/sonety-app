import ReactPlayer from "react-player/youtube";
import { MdPlayArrow, MdPause, MdClose } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { getImageYoutube } from "../../utils/getImageYoutube";

export default function AudioPlayer() {
  const { currentSong, isPlaying, togglePlay, closePlayer } = useContext(AppContext);

  // Si no hay canción seleccionada, no se muestra nada
  if (!currentSong) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <img
          src={getImageYoutube(currentSong.url_youtube)}
          alt={currentSong.title}
          className="w-14 h-14 rounded-md object-cover"
        />
        <div>
          <p className="font-bold">{currentSong.title}</p>
          <p className="text-sm text-gray-400">{currentSong.artist.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700"
        >
          {isPlaying ? <MdPause size={28} /> : <MdPlayArrow size={28} />}
        </button>
        <button
          onClick={closePlayer}
          className="text-gray-400 hover:text-white"
        >
          <MdClose size={24} />
        </button>
      </div>

      {/* El reproductor de YouTube está oculto pero activo */}
      <div className="absolute top-[-9999px] left-[-9999px]">
        <ReactPlayer
          url={currentSong.url_youtube}
          playing={isPlaying}
          width="1px"
          height="1px"
          onEnded={closePlayer} // Opcional: cierra el reproductor cuando termina
        />
      </div>
    </div>
  );
}
