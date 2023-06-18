// IMPORT STYLES
import "./FilterCheckbox.css";

// FILTER CHECKBOX COMPONENT
function FilterCheckbox({ onFilterChange, isFilterOn }) {
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__toggle"
        form="search-and-filter"
        name="toggle"
        type="checkbox"
        value={isFilterOn}
        onChange={(evt) => onFilterChange(evt.target.checked)}
      />
      <span className="filter-checkbox__track"></span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
