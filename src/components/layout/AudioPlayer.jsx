import YouTubePlayer from "youtube-player";
import { MdPlayArrow, MdPause, MdClose } from "react-icons/md";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { getImageYoutube } from "../../utils/getImageYoutube";

// Helper para formatear el tiempo de segundos a MM:SS
const formatDuration = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// 2. NUEVO Helper para convertir "mm:ss" a segundos
const parseDurationToSeconds = (duration) => {
  if (typeof duration !== "string") return 0;
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
};

const getYoutubeVideoId = (url) => {
  console.log(url)
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  console.log(match[2])
  return match && match[2].length === 11 ? match[2] : null;
};

export default function AudioPlayer() {
  const { currentSong, isPlaying, togglePlay, closePlayer, setApp } =
    useContext(AppContext);
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);

  const [progress, setProgress] = useState({ playedSeconds: 0 });
  const [duration, setDuration] = useState(0);

  // 3. Calcula la duración total en segundos a partir de currentSong.duration
  const totalDurationInSeconds = useMemo(() => {
    return currentSong ? parseDurationToSeconds(currentSong.duration) : 0;
  }, [currentSong]);

  useEffect(() => {
    const videoId = getYoutubeVideoId(currentSong?.youtube_url);

    if (videoId && playerContainerRef.current) {
      // Si ya existe un reproductor, lo destruimos
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      // Creamos una nueva instancia del reproductor
      const player = YouTubePlayer(playerContainerRef.current, {
        videoId: videoId,
        playerVars: {
          controls: 0, // Ocultar controles nativos
        },
      });

      playerRef.current = player;

      // Evento para obtener la duración
      // player.getDuration().then(setDuration);

      // Evento para el progreso del tiempo
      const progressInterval = setInterval(async () => {
        const currentTime = await player.getCurrentTime();
        setProgress({ playedSeconds: currentTime });
      }, 1000);

      // Evento para saber cuándo termina la canción
      player.on("stateChange", (event) => {
        if (event.data === 0) {
          // 0 = 'ended'
          closePlayer();
          document.title = `Sonety - Canciones`
        }
      });

      // Limpieza al desmontar o cambiar de canción
      return () => {
        clearInterval(progressInterval);
        player.destroy();
      };
    }
  }, [currentSong?.youtube_url]);

  // 3. useEffect para controlar Play/Pause
  useEffect(() => {
    if (playerRef.current) {
      isPlaying
        ? playerRef.current.playVideo()
        : playerRef.current.pauseVideo();
    }
  }, [isPlaying]);
  // Si no hay canción seleccionada, no se muestra nada

  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setProgress({ playedSeconds: newTime });
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true);
    }
  };

  if (!currentSong) {
    return null;
  }

  const percentage = totalDurationInSeconds
    ? (progress.playedSeconds / totalDurationInSeconds) * 100
    : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col border-t border-t-app-border bg-app-bg p-3 text-white shadow-lg lg:flex-row lg:items-center lg:p-4">
      {/* --- Sección Izquierda y Derecha (Móvil) / Izquierda (Desktop) --- */}
      <div className="flex w-full items-center justify-between lg:w-1/3">
        {/* Info de la Canción */}
        <div className="flex flex-grow items-center gap-4 overflow-hidden">
          <img
            src={getImageYoutube(currentSong.youtube_url)}
            alt={currentSong.title}
            className="h-14 w-14 flex-shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{currentSong.title}</p>
            <p className="truncate text-sm text-gray-400">
              {currentSong.artist.name}
            </p>
          </div>
        </div>

        {/* Controles para Móvil (Play/Pause y Cerrar) */}
        <div className="flex flex-shrink-0 items-center gap-2 lg:hidden">
          <button
            onClick={togglePlay}
            className="rounded-full bg-white p-2 text-gray-900"
          >
            {isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
          </button>
          <button
            onClick={closePlayer}
            className="text-gray-400 hover:text-white"
          >
            <MdClose size={24} />
          </button>
        </div>
      </div>

      {/* --- Sección Central (Desktop) / Inferior (Móvil) --- */}
      <div className="mt-3 flex w-full flex-col items-center gap-2 lg:mt-0 lg:w-1/3">
        {/* Botón de Play/Pause (Solo para Desktop) */}
        <div className="hidden lg:flex">
          <button
            onClick={togglePlay}
            className="rounded-full bg-white p-2 text-gray-900"
          >
            {isPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
          </button>
        </div>

        {/* Barra de Tiempo */}
        <div className="flex w-full items-center gap-2">
          <span className="hidden w-10 text-xs text-gray-400 sm:inline">
            {formatDuration(progress.playedSeconds)}
          </span>
          <input
            type="range"
            min={0}
            max={totalDurationInSeconds}
            step="any"
            value={progress.playedSeconds}
            onChange={handleSeekChange}
            className="range-thumb-blue"
            style={{
              background: `linear-gradient(to right, #155dfc 0%, #155dfc ${percentage}%, #4b5563 ${percentage}%, #4b5563 100%)`,
            }}
          />
          <span className="hidden w-10 text-xs text-gray-400 sm:inline">
            {currentSong.duration}
          </span>
        </div>
      </div>

      {/* --- Sección Derecha (Solo para Desktop) --- */}
      <div className="hidden w-1/3 justify-end lg:flex">
        <button
          onClick={closePlayer}
          className="text-gray-400 hover:text-white"
        >
          <MdClose size={24} />
        </button>
      </div>

      {/* El reproductor de YouTube está oculto pero activo */}
      <div className="absolute top-[-9999px] left-[-9999px]">
        <div ref={playerContainerRef}></div>
      </div>
    </div>
  );
}
