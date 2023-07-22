import { useState, useCallback, useEffect } from "react";

import "./SavedMovies.css";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

import { DURATION_MOV } from '../../utils/constants';

// import { handleMovieFilter, handleMovieSearch } from '../../utils/constants';

function SavedMovies({ savedCards, onCardDelete }) {

  const [cardsRendering, setCardsRendering] = useState([]);
  const [filterCards, setFilterCards] = useState([]);
  const [isFilterOn, setFilter] = useState(false);
  const [isCardsNotFound, setCardsNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleMovieSearch = (movies, searchQuery, isSavedMovies) => {
    const normalizeSearchQuery = searchQuery.toLowerCase();
    const result = movies.filter((movie) => {
      const normalizeNameRu = movie.nameRU.toLowerCase();
      const normalizeNameEn = movie.nameEN.toLowerCase();
      return (
        normalizeNameRu.includes(normalizeSearchQuery) ||
        normalizeNameEn.includes(normalizeSearchQuery)
      );
    });
    if (!isSavedMovies) {
      localStorage.setItem("foundMovies", JSON.stringify(result));
      localStorage.setItem("moviesSearchQuery", normalizeSearchQuery);
    } else {
      localStorage.setItem("savedMoviesSearchQuery", normalizeSearchQuery);
    }
    return result;
  }

  const handleMovieFilter = (movies, isFilterOn, isSavedMovies) => {
    if (!isSavedMovies) {
      localStorage.setItem("isMoviesFilterOn", isFilterOn);
    } else {
      localStorage.setItem("isSavedMoviesFilterOn", isFilterOn);
    }
    if (isFilterOn) {
      const result = movies.filter((movie) => movie.duration <= DURATION_MOV);
      return result;
    } else {
      return movies;
    }
  }

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
          setCardsRendering(found);
        } else {
          const filtered = handleMovieFilter(found, isFilterOn, true);
          setIsSearching(false);
          setCardsRendering(filtered);
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
      setCardsRendering(filter);
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
        setCardsRendering(found);
      } else {
        const filtered = handleMovieFilter(found, filter, true);
        setCardsRendering(filtered);
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
      setCardsRendering(filtered);
      if (!filtered.length) {
        setCardsNotFound(true);
      }
    } else {
      setCardsRendering(savedCards);
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
        cards={cardsRendering}
        savedCards={savedCards}
        isCardsNotFound={isCardsNotFound}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}

export default SavedMovies;
