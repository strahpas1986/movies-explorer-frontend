// импорт
import { useState, useCallback, useEffect } from "react";

// Импорт стилей
import "./SavedMovies.css";

// Импорт компонентов
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

// импорт utils
import { handleMovieFilter, handleMovieSearch } from "../../utils/utils";


// Компонент SavedMovies
function SavedMovies({ savedCards, onCardDelete }) {

  const [cardsRender, setCardsRender] = useState([]);
  const [filterCards, setFilterCards] = useState([]);
  const [isFilterOn, setFilter] = useState(false);
  const [isCardsNotFound, setCardsNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const cbSearchSubmit = useCallback(
    (searchQuery) => {
      setCardsNotFound(false);
      setIsSearching(true);
      if (savedCards.length) {
        const found = handleMovieSearch(savedCards, searchQuery, true);
        setFilterCards(found);
        if (!found.length) {
          setCardsNotFound(true);
          setIsSearching(false);
          setCardsRender(found);
        } else {
          const filtered = handleMovieFilter(found, isFilterOn, true);
          setIsSearching(false);
          setCardsRender(filtered);
          if (!filtered.length) {
            setIsSearching(false);
            setCardsNotFound(true);
          }
        }
      } else {
        setIsSearching(false);
        setCardsNotFound(true);
      }
    },
    [savedCards, isFilterOn]
  );

  const cbFilterClick = useCallback(
    (isChecked) => {
      setFilter(isChecked);
      setCardsNotFound(false);
      const filter = handleMovieFilter(filterCards, isChecked, true);
      setCardsRender(filter);
      if (!filter.length) {
        setCardsNotFound(true);
      }
    },
    [filterCards]
  );

  useEffect(() => {
    setCardsNotFound(false);
    if (
      localStorage.getItem("savedMoviesSearchQuery") &&
      localStorage.getItem("isSavedMoviesFilterOn")
    ) {
      const filter = JSON.parse(localStorage.getItem("isSavedMoviesFilterOn"));
      setFilter(filter);
      const searchQuery = localStorage.getItem("savedMoviesSearchQuery");
      const found = handleMovieSearch(savedCards, searchQuery, true);
      setFilterCards(found);
      if (!found.length) {
        setCardsNotFound(true);
        setCardsRender(found);
      } else {
        const filtered = handleMovieFilter(found, filter, true);
        setCardsRender(filtered);
        if (!filtered.length) {
          setCardsNotFound(true);
        }
      }
    } else if (
      !localStorage.getItem("savedMoviesSearchQuery") &&
      localStorage.getItem("isSavedMoviesFilterOn")
    ) {
      setFilterCards(savedCards);
      const filter = JSON.parse(localStorage.getItem("isSavedMoviesFilterOn"));
      setFilter(filter);
      const filtered = handleMovieFilter(savedCards, filter, true);
      setCardsRender(filtered);
      if (!filtered.length) {
        setCardsNotFound(true);
      }
    } else {
      setCardsRender(savedCards);
      setFilterCards(savedCards);
    }
  }, [savedCards]);

  return (
    <main className="saved-movies">
      <SearchForm
        onSearch={cbSearchSubmit}
        onFilterChange={cbFilterClick}
        isFilterOn={isFilterOn}
        isSearching={isSearching}
      />
      <MoviesCardList
        cards={cardsRender}
        savedCards={savedCards}
        isCardsNotFound={isCardsNotFound}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}

export default SavedMovies;
