// Lista de ejemplo. En una app real, estas vendrían de tu API.
const TONES = [
  "C", "C#", "Cm", "C#m",
  "D", "D#", "Dm", "D#m",
  "E", "Em",
  "F", "F#", "Fm", "F#m",
  "G", "G#", "Gm", "G#m",
  "A", "A#", "Am", "A#m",
  "B", "Bm"
];
const AVAILABLE_TAGS = [
  { id: 1, name: "Alabanza" },
  { id: 2, name: "Adoración" },
];

export default function FilterPanel({ isOpen, filters, setFilters }) {
  // Manejador para el Tono y Tempo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador para las etiquetas (selección múltiple)
  const handleTagClick = (tagId) => {
    setFilters((prev) => {
      const newTags = prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId) // Si ya está, la quita
        : [...prev.tags, tagId]; // Si no está, la añade
      return { ...prev, tags: newTags };
    });
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setFilters({ key_chord: "", tempo: "", tags: [] });
  };

  return (
    <div
      className={`
        bg-app-surface-hover rounded-lg overflow-hidden
        transition-[max-height] duration-300 ease-in-out
        ${isOpen ? "max-h-96 opacity-100 p-4 mt-4" : "max-h-0 opacity-0"}
      `}
    >
      {/* El contenido del panel no cambia */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- Filtro por Tono --- */}
          <div className="flex flex-col gap-2">
            <label htmlFor="key" className="font-bold text-gray-300 text-sm">
              Tono de la canción
            </label>
            <select
              id="key"
              name="key_chord"
              value={filters.key_chord}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-[#f57a0c] focus:outline-none"
            >
              <option value="">Cualquiera</option>
              {TONES.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>

          {/* --- Filtro por Tempo --- */}
          <div className="flex flex-col gap-2">
            <label htmlFor="tempo" className="font-bold text-gray-300 text-sm">
              Tempo (BPM)
            </label>
            <input
              type="number"
              id="tempo"
              name="tempo"
              value={filters.tempo}
              onChange={handleInputChange}
              placeholder="Ej: 120"
              className="bg-gray-700 border-gray-600 rounded-lg p-2 focus:ring-2 focus:ring-[#f57a0c] focus:outline-none"
            />
          </div>
        </div>
        {/* --- Filtro por Etiquetas --- */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-gray-300 text-sm">Etiquetas</label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_TAGS.map((tag) => {
              const isSelected = filters.tags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id)}
                  className={`
                  px-3 py-1 rounded-full text-sm font-semibold transition-all
                  ${
                    isSelected
                      ? "bg-[#f57a0c] text-white shadow-md"
                      : "bg-gray-600 hover:bg-gray-500 text-gray-300"
                  }
                `}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Botón para limpiar filtros */}
        <div className="flex justify-end pt-2">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-400 hover:text-white hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
