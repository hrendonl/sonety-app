import { MdSearch, MdClose } from "react-icons/md";

export default function SearchBox({ handleOnChange, searchTerm, placeholder }) {
  const handleClear = () => {
    handleOnChange("");
  };

  return (
    <div className="relative flex-grow">
      <MdSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          aria-label="Borrar búsqueda"
        >
          <MdClose size={20} />
        </button>
      )}
    </div>
  );
}