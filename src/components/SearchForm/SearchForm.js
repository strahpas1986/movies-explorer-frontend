// IMPORT STYLES
import "./SearchForm.css";

// IMPORT COMPONENTS
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

// SEARCH FORM COMPONENT
function SearchForm({ onFilterChange, isFilterOn }) {
  // HANDLER SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section
      className="search-form"
      aria-label="Секция с поиском и фильтрацией"
    >
      <form
        className="search-form__form"
        id="search-and-filter"
        action="#"
        name="search-and-filter"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="search-form__search"
          form="search-and-filter"
          name="search"
          placeholder="Фильм"
          type="search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FilterCheckbox
          onFilterChange={onFilterChange}
          isFilterOn={isFilterOn}
        />
        <button
          className="search-form__btn-submit hover-button"
          type="submit"
          form="search-and-filter"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13L7 7L1 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
