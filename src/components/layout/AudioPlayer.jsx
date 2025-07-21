import YouTubePlayer from 'youtube-player';
import { MdPlayArrow, MdPause, MdClose } from "react-icons/md";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { getImageYoutube } from "../../utils/getImageYoutube";

// Helper para formatear el tiempo de segundos a MM:SS
const formatDuration = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// 2. NUEVO Helper para convertir "mm:ss" a segundos
const parseDurationToSeconds = (duration) => {
  if (typeof duration !== 'string') return 0;
  const [minutes, seconds] = duration.split(':').map(Number);
  return (minutes * 60) + seconds;
};

const getYoutubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
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
    const videoId = getYoutubeVideoId(currentSong?.url_youtube);

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
      player.on('stateChange', (event) => {
        if (event.data === 0) { // 0 = 'ended'
          closePlayer();
        }
      });
      
      // Limpieza al desmontar o cambiar de canción
      return () => {
        clearInterval(progressInterval);
        player.destroy();
      };
    }
  }, [currentSong?.url_youtube]);

  // 3. useEffect para controlar Play/Pause
  useEffect(() => {
    if (playerRef.current) {
      isPlaying ? playerRef.current.playVideo() : playerRef.current.pauseVideo();
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

       <div className="flex w-1/2 flex-col items-center gap-2">
        <button onClick={togglePlay} className="rounded-full bg-blue-600 p-2 hover:bg-blue-700">
          {isPlaying ? <MdPause size={28} /> : <MdPlayArrow size={28} />}
        </button>
        <div className="flex w-full items-center gap-2">
          <span className="w-10 text-xs text-gray-400">{formatDuration(progress.playedSeconds)}</span>
          <input
            type="range"
            min={0}
            max={totalDurationInSeconds}
            step="any"
            value={progress.playedSeconds}
            // onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            // onMouseUp={handleSeekMouseUp}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm"
            style={{
              background: `linear-gradient(to right, #0d73ec 0%, #0d73ec ${percentage}%, #4b5563 ${percentage}%, #4b5563 100%)`,
            }}
          />
          <span className="w-10 text-xs text-gray-400">{currentSong.duration}</span>
        </div>
      </div>

      <div className="flex w-1/4 justify-end">
        <button onClick={closePlayer} className="text-gray-400 hover:text-white">
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
