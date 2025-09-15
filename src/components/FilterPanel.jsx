export default function FilterPanel({
  filters,
  onChange,
  options = [],
  priceRange,
}) {
  return (
    <section className="filter-panel">
      <>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          data-testid="filter-category"
          placeholder="Enter category"
          value={filters.category || ""}
          onChange={onChange("category")}
        />
      </>

      <>
        <label htmlFor="brandSelect">Brand</label>
        <select
          id="brandSelect"
          data-testid="filter-brand"
          value={filters.brand || ""}
          onChange={onChange("brand")}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      </>

      <>
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          data-testid="filter-rating"
          value={filters.rating || ""}
          onChange={onChange("rating")}
          min={0}
          max={5}
          step={0.1}
          placeholder="0 - 5"
        />
      </>

      <>
        <label htmlFor="price">
          Price Range: ${filters.priceFrom || 0} - ${filters.priceTo || 0}
        </label>
        <input
          type="range"
          id="price"
          data-testid="price-range"
          min={priceRange.min}
          max={priceRange.max}
          value={filters.priceTo || priceRange.max}
          onChange={onChange("priceTo")}
        />
      </>
    </section>
  );
}
