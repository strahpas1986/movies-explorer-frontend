import { useCallback, useState, useEffect } from "react";
import useResizeScreen from "../../hooks/useResizeScreen";

// Импорт стилей
import "./Movies.css";

// Импорт компонентов
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { handleMovieFilter, handleMovieSearch } from "../../utils/utils";

import { CARDS_PARAM } from "../../utils/constants";

// Компонент Movies
function Movies({
  savedCards,
  onSearch,
  onCardSave,
  onCardDelete,
  isLoading,
}) {
  const [initialCards, setInitialCards] = useState([]);
  const [cardsRender, setCardsRender] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [isFilterOn, setFilter] = useState(false);
  const [isCardsNotFound, setCardsNotFound] = useState(false);
  const [cardsParams, setCardsParams] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const screenWidth = useResizeScreen();

  // функция поиска и фильтрации фильмов
  const cbSearchAndFilter = useCallback(
    (cards, searchQuery) => {
      const found = handleMovieSearch(cards, searchQuery, false);
      setFoundCards(found);
      if (!found.length) {
        setCardsNotFound(true);
        setIsSearching(false);
        setCardsRender(found);
      } else {
        const filter = handleMovieFilter(found, isFilterOn, false);
        setIsSearching(false);
        setCardsRender(filter);
        if (!filter.length) {
          setIsSearching(false);
          setCardsNotFound(true);
        }
      }
    },
    [isFilterOn]
  );

  // функция поиска фильмов
  const cbSearchSibmit = useCallback(
    async (searchQuery) => {
      setCardsNotFound(false);
      setIsSearching(true);
      if (!initialCards.length) {
        const moviesData = await onSearch();
        if (moviesData) {
          setInitialCards(moviesData);
          cbSearchAndFilter(moviesData, searchQuery);
        }
      } else {
        cbSearchAndFilter(initialCards, searchQuery);
      }
    },
    [cbSearchAndFilter, initialCards, onSearch]
  );

  // функция фильтра фильмов
  const cbFilterMovies = useCallback(
    (isChecked) => {
      setFilter(isChecked);
      setCardsNotFound(false);
      const filter = handleMovieFilter(foundCards, isChecked, false);
      setCardsRender(filter);
      if (!filter.length) {
        setCardsNotFound(true);
      }
    },
    [foundCards]
  )

  // отображение списка фильмов в зависимости от разрешения
  useEffect(() => {
    if (screenWidth >= CARDS_PARAM.desktop_full.width) {
      setCardsParams(CARDS_PARAM.desktop_full.cards);
    } else if (
      screenWidth < CARDS_PARAM.base.width &&
      screenWidth >= CARDS_PARAM.desktop.width
    ) {
      setCardsParams(CARDS_PARAM.desktop.cards);
    } else if (
      screenWidth < CARDS_PARAM.desktop.width &&
      screenWidth >= CARDS_PARAM.tablet.width
    ) {
      setCardsParams(CARDS_PARAM.tablet.cards);
    } else {
      setCardsParams(CARDS_PARAM.mobile.cards);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (
      localStorage.getItem("foundMovies") &&
      localStorage.getItem("isMoviesFilterOn")
    ) {
      const filter = JSON.parse(localStorage.getItem("isMoviesFilterOn"));
      setFilter(filter);
      const foundMovies = JSON.parse(localStorage.getItem("foundMovies"));
      setFoundCards(foundMovies);
      if (!foundMovies.length) {
        setCardsNotFound(true);
        setCardsRender(foundMovies);
      } else {
        const filtered = handleMovieFilter(foundMovies, filter, false);
        setCardsRender(filtered);
        if (!filtered.length) {
          setCardsNotFound(true);
        }
      }
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm
        onSearch={cbSearchSibmit}
        onFilterChange={cbFilterMovies}
        isFilterOn={isFilterOn}
        isSearching={isSearching}
      />
      <MoviesCardList
        cards={cardsRender}
        savedCards={savedCards}
        cardsParams={cardsParams}
        isCardsNotFound={isCardsNotFound}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isLoading={isLoading}
      />
    </main>
  );
}

export default Movies;
