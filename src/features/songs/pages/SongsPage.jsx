import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MdAdd, MdFilterList } from "react-icons/md";
import PaginationControls from "../../../components/ui/PaginationControls";
import { getSongs } from "../../../api/songApi";
import SearchBox from "../../../components/ui/SearchBox";
import SongList from "../components/SongList";
import { AppContext } from "../../../context/AppProvider";
import FilterPanel from "../components/FilterPanel";

// Componente para el estado de carga (Skeleton)
const SongListSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-20 bg-app-surface-hover rounded-lg"></div>
    ))}
  </div>
);

// Componente para estados vacíos o de error
const InfoState = ({ message, onRetry }) => (
  <div className="text-center py-16 px-6 bg-app-surface-hover rounded-lg">
    <p className="text-gray-400">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-app-accent rounded-lg font-bold"
      >
        Reintentar
      </button>
    )}
  </div>
);

export default function SongsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { groupSelected } = useContext(AppContext);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    key_chord: "",
    tempo: "",
    tags: [],
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["songs", currentPage, searchTerm, groupSelected, filters],
    queryFn: () =>
      getSongs(groupSelected.id, currentPage, searchTerm, filters).then(
        (res) => res.data
      ),
    keepPreviousData: true,
  });

  const handleSearch = async (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
    // No es necesario refetch aquí, React Query lo hace automáticamente al cambiar el queryKey
  };

  const renderContent = () => {
    if (isLoading) {
      return <SongListSkeleton />;
    }
    if (isError) {
      return (
        <InfoState
          message={`Error al cargar las canciones: ${error.message}`}
          onRetry={refetch}
        />
      );
    }
    if (!data?.list || data.list.length === 0) {
      return (
        <InfoState message="No se encontraron canciones. ¡Prueba a cambiar los filtros o añade una nueva!" />
      );
    }
    return <SongList songs={data.list} />;
  };

  return (
    <div className="text-white space-y-6">
      {/* SECCIÓN 2: Controles de la Lista */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <div className="flex-grow">
            <SearchBox
              handleOnChange={handleSearch}
              searchTerm={searchTerm}
              placeholder="Buscar por canción o artista..."
            />
          </div>
          <button
            onClick={() => setIsFilterPanelOpen((prev) => !prev)}
            className={`flex-shrink-0 flex items-center justify-center gap-2 text-white cursor-pointer rounded-lg px-4 py-2 font-bold transition-all ${
              isFilterPanelOpen
                ? "bg-app-accent text-white"
                : "bg-app-surface-hover hover:bg-app-button-bg"
            }`}
          >
            <MdFilterList size={20} />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>
        <FilterPanel
          isOpen={isFilterPanelOpen}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="flex justify-center md:justify-start">
          <Link
            to="/songs/new"
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-app-accent text-white font-bold rounded-lg px-4 py-2 text-sm transition-colors"
          >
            <MdAdd size={20} />
            <span>Nueva Canción</span>
          </Link>
        </div>
      </div>

      {/* SECCIÓN 3: Contenido Principal */}
      <div>{renderContent()}</div>

      {/* SECCIÓN 4: Pie de la Lista (solo se muestra si hay canciones) */}
      {data?.list && data.list.length > 0 && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pt-4 border-t border-app-surface-hover">
          <p className="text-gray-400">
            Total:
            <span className="font-bold text-white pl-3">
              {data?.pagination.total_items ?? 0}
            </span>
          </p>
          {data?.pagination.total_pages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={data.pagination.total_pages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      )}
    </div>
  );
}
