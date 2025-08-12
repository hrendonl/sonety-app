import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between sm:w-auto sm:justify-center sm:gap-4 md:w-auto flex-shrink-0">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-2 py-2 font-semibold text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
      >
        <MdNavigateBefore size={22} />
        {/* Anterior */}
      </button>

      <span className="text-gray-300 sm:hidden">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-2 py-2 font-semibold text-white bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
      >
        {/* Siguiente */}
        <MdNavigateNext size={22} />
      </button>
    </div>
  );
}