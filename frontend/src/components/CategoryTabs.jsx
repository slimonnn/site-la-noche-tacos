export function CategoryTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="sticky top-0 z-20 -mt-4 border-b border-brand-100 bg-crema/95 px-4 pb-4 pt-6 backdrop-blur">
      <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto pb-1">
        {categories.map((category) => {
          const active = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-brand-700 text-white shadow-lg shadow-brand-700/20"
                  : "bg-white text-ink shadow-sm"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
