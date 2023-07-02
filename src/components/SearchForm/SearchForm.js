// Импорт пакетов
import useValidation from "../../hooks/useValidation";

// Импорт стилей
import "./SearchForm.css";

// Импорт компонентов
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

// Компонент SearchForm
function SearchForm({ onFilterChange, isFilterOn }) {

  const { isFormValid } = useValidation();

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
        onSubmit={handleSubmit}
      >
        <div className="search-form__form_search">
          <input
            className="search-form__search"
            form="search-and-filter"
            name="search"
            required
            isFormValid={isFormValid}
            placeholder="Фильм"
            type="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <button
            className="search-form__btn-submit hover-button"
            type="submit"
            form="search-and-filter"
          >
            <svg className="search-form__btn-submit_img-line" width="1" height="30" viewBox="0 0 1 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.5" x2="0.5" y2="30" stroke="white"/>
            </svg>
            <svg className="search-form__btn-submit_img-arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <FilterCheckbox
          onFilterChange={onFilterChange}
          isFilterOn={isFilterOn}
        />

      </form>
    </section>
  );
}

export default SearchForm;
