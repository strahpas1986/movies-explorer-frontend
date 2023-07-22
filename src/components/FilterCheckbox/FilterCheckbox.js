import './FilterCheckbox.css';

function FilterCheckbox({ onFilterChange, isFilterOn, isSearching }) {
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__toggle"
        form="search-and-filter"
        name="toggle"
        type="checkbox"
        disabled={isSearching ? true : false}
        value={isFilterOn}
        onChange={(evt) => onFilterChange(evt.target.checked)}
      />
      <span className="filter-checkbox__track"></span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
