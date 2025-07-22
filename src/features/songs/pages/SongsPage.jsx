import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MdAdd, MdSearch } from "react-icons/md";
import SongItem from "../components/SongItem";
import PaginationControls from "../../../components/ui/PaginationControls";
import { getSongs } from "../../../api/songApi";
import SearchBox from "../../../components/ui/SearchBox";

// --- Mock de datos y función de fetch (reemplaza con tu llamada a la API real) ---
// const allSongs = Array.from({ length: 25 }, (_, i) => ({
//   id: i + 1,
//   title: `Canción Número ${i + 1}`,
//   artist: 'Artista Famoso',
//   key: 'G',
//   tempo: 120 + (i % 10),
//   duration: 180 + i * 5, // Duración en segundos (ej. 3:00, 3:05, etc.)
//   // imageUrl: 'https://i.ytimg.com/vi/C4DqvUby9B0/mqdefault.jpg'
// }));

// const fetchSongs = async (page = 1, limit = 5) => {
//   console.log(`Fetching page: ${page}`);
//   await new Promise(resolve => setTimeout(resolve, 500));
//   const start = (page - 1) * limit;
//   const end = start + limit;
//   const paginatedSongs = allSongs.slice(start, end);
//   return {
//     songs: paginatedSongs,
//     totalPages: Math.ceil(allSongs.length / limit),
//   };
// };
// --- Fin del mock ---

export default function SongsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [groupId, setGroupId] = useState("685f512194e837da8958687e");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["songs", currentPage, searchTerm],
    queryFn: () =>
      getSongs(groupId, currentPage, searchTerm).then((res) => res.data),
    keepPreviousData: true,
  });

  const handleSearch = async (query) => {
    setSearchTerm(query);
    setCurrentPage(1)
    await refetch();
  };

  // const filteredSongs = data?.songs?.filter(song =>
  //   song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="text-white space-y-6">
      <h1 className="lg:text-3xl text-xl font-bold">Canciones</h1>

      {/* Contenedor de Acciones: Buscador y Botón */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBox
          handleOnChange={handleSearch}
          searchTerm={searchTerm}
          placeholder="Buscar por canción o artista..."
        />
        <Link
          to="/songs/new"
          className="flex items-center justify-center gap-2 hover:bg-green-600 bg-green-700 rounded-lg px-4 py-2 font-semibold transition-colors"
        >
          <MdAdd size={22} />
          <span className="hidden sm:inline">Nueva Canción</span>
        </Link>
      </div>

      <div className="flex flex-col sm:items-center gap-4 sm:flex-row sm:justify-between">
        <div>
          <p className="text-gray-400">
            Total de canciones:{" "}
            <span className="font-bold text-white">
              {data?.pagination.total_items ?? 0}
            </span>
          </p>
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={data?.pagination.total_pages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Listado de Canciones */}
      <div className="space-y-2 min-h-[340px]">
        {isLoading && (
          <p className="text-center text-gray-400">Cargando canciones...</p>
        )}
        {error && (
          <p className="text-center text-red-500">
            Error al cargar las canciones.
          </p>
        )}
        {data?.list?.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
