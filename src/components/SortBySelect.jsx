export default function SortBySelect({
  field,
  label,
  options,
  value,
  onChange,
}) {
  return (
    <div className="sort-by-select">
      <label htmlFor="sort">{label}</label>
      <select
        id="sort"
        data-testid="sort-select"
        value={value}
        onChange={onChange(field)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
