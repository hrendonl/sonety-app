import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MdAdd, MdSearch, MdFilterList } from "react-icons/md";
import PaginationControls from "../../../components/ui/PaginationControls";
import { getSongs } from "../../../api/songApi";
import SearchBox from "../../../components/ui/SearchBox";
import SongList from "../components/SongList";
import { AppContext } from "../../../context/AppProvider";

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
  const {groupSelected} = useContext(AppContext)
  

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["songs", currentPage, searchTerm, groupSelected],
    queryFn: () =>
      getSongs(groupSelected.id, currentPage, searchTerm).then((res) => res.data),
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

      {/* --- Barra de Búsqueda y Filtros --- */}
      <div className="flex flex-row gap-3">
        {/* ✨ El SearchBox ahora ocupa el espacio disponible ✨ */}
        <div className="flex-grow">
          <SearchBox
            handleOnChange={handleSearch}
            searchTerm={searchTerm}
            placeholder="Buscar por canción o artista..."
          />
        </div>
        {/* ✨ El botón de filtros mantiene su tamaño ✨ */}
        <button
          className="flex-shrink-0 flex items-center justify-center gap-2 bg-gray-700 text-white cursor-pointer rounded-lg px-4 py-2 font-bold transition-colors"
        >
          <MdFilterList size={20} />
          <span className="hidden sm:inline">Filtros</span>
        </button>
      </div>

      {/* --- Barra de Paginación y Acciones --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* ✨ Contenedor con justify-between para separar los elementos ✨ */}
        <div className="w-full flex items-center justify-between gap-4">
          <Link
            to="/songs/new"
            className="flex-shrink-0 flex items-center justify-center gap-2  bg-[#f57a0c] text-white font-bold rounded-lg px-4 py-2 text-sm  transition-colors"
          >
            <MdAdd size={20} />
            <span>Nueva Canción</span>
          </Link>
           <div>
            <p className="text-gray-400">
              Total:
              <span className="font-bold text-white pl-3">
                {data?.pagination.total_items ?? 0}
              </span>
            </p>
          </div>
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={data?.pagination.total_pages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <SongList songs={data?.list} isLoading={isLoading} error={error} refetch={refetch}/>
    </div>
  );
}
