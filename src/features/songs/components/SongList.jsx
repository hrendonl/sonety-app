import SongItem from "./SongItem";

export default function SongList({ songs, isLoading, error, refetch }) {
  return (
    <div className="space-y-6">
      {songs?.length > 0 && <div className="hidden md:grid grid-cols-[1fr_repeat(3,minmax(0,90px))_minmax(0,140px)] gap-4 items-center px-4 text-sm font-semibold text-app-subtext">
        <span className="col-start-1">Canción</span>
        <span className="text-center col-start-2">Tono</span>
        <span className="text-center col-start-3">Tempo</span>
        <span className="text-center col-start-4">Duración</span>
      </div>}
      <div className="space-y-2 min-h-[340px]">
        {isLoading && <p className="text-center text-gray-400">Cargando...</p>}
        {error && <p className="text-center text-red-500">Error al cargar.</p>}
        {songs?.map((song) => (
          <SongItem key={song.id} song={song} refetch={refetch}/>
        ))}
      </div>
    </div>
  );
}
