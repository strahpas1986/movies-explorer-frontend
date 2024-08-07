import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import './SearchForm.scss';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearch, onFilterChange, isFilterOn, isSearching }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [queryError, setQueryError] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("moviesSearchQuery")
    ) {
      const savedSearchQuery = localStorage.getItem("moviesSearchQuery");
      setSearchQuery(savedSearchQuery);
    } else if (
      location.pathname === "/saved-movies" &&
      localStorage.getItem("savedMoviesSearchQuery")
    ) {
      const savedSearchQuery = localStorage.getItem("savedMoviesSearchQuery");
      setSearchQuery(savedSearchQuery);
    }
  }, [location.pathname]);

  useEffect(() => {
    setQueryError("");
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === "/movies") {
      searchQuery
        ? onSearch(searchQuery)
        : setQueryError("Нужно ввести ключевое слово");
    } else {
      onSearch(searchQuery);
    }
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
        <div className="search-form__form_search">
          <input
            className="search-form__search"
            form="search-and-filter"
            name="search"
            required
            placeholder="Фильм"
            type="search"
            autoComplete="off"
            autoCapitalize="off"
            disabled={isSearching ? true : false}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery || ""}
          />
          <button
            className="search-form__btn-submit"
            type="submit"
            form="search-and-filter"
          >
            <svg className="search-form__btn-submit_img-line" width="1" height="30" viewBox="0 0 1 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.5" x2="0.5" y2="30" stroke="white"/>
            </svg>
            <svg className="search-form__btn-submit_img-arrow" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <FilterCheckbox
          onFilterChange={onFilterChange}
          isFilterOn={isFilterOn}
          isSearching={isSearching}
        />

      </form>
      <span className="search-form__error">{queryError}</span>
    </section>
  );
}

export default SearchForm;
