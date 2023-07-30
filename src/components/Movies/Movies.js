import { useCallback, useState, useEffect } from "react";
import useResize from '../../utils/useResize';

import "./Movies.css";

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { handleMovieFilter, handleMovieSearch } from "../../utils/utils";

import { WIDTH_BREAKPOINT } from '../../utils/constants';

function Movies({
  savedCards,
  onSearch,
  onCardSave,
  onCardDelete,
  isLoading,
  loggedIn,
  onHamburgerClick,
}) {
  const [initialCards, setInitialCards] = useState([]);
  const [cardsRendering, setCardsRendering] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [isFilterOn, setFilter] = useState(false);
  const [isCardsNotFound, setCardsNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [cardsParams, setCardsParams] = useState({});
  const windowWidth = useResize();

  const cbSearchAndFilter = useCallback(
    (cards, searchQuery) => {
      const found = handleMovieSearch(cards, searchQuery, false);
      setFoundCards(found);
      if (!found.length) {
        setCardsNotFound(true);
        setIsSearching(false);
        setCardsRendering(found);
      } else {
        const filter = handleMovieFilter(found, isFilterOn, false);
        setIsSearching(false);
        setCardsRendering(filter);
        if (!filter.length) {
          setIsSearching(false);
          setCardsNotFound(true);
        }
      }
    },
    [isFilterOn]
  );

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

  const cbFilterMovies = useCallback(
    (isChecked) => {
      setFilter(isChecked);
      setCardsNotFound(false);
      const filter = handleMovieFilter(foundCards, isChecked, false);
      setCardsRendering(filter);
      if (!filter.length) {
        setCardsNotFound(true);
      }
    },
    [foundCards]
  );

  // отображение списка фильмов в зависимости от разрешения
  useEffect(() => {
    if (windowWidth >= WIDTH_BREAKPOINT.xl.width) {
      setCardsParams(WIDTH_BREAKPOINT.xl.cards);
    } else if (
      windowWidth < WIDTH_BREAKPOINT.xl.width &&
      windowWidth >= WIDTH_BREAKPOINT.lg.width
    ) {
      setCardsParams(WIDTH_BREAKPOINT.lg.cards);
    } else if (
      windowWidth < WIDTH_BREAKPOINT.lg.width &&
      windowWidth >= WIDTH_BREAKPOINT.md.width
    ) {
      setCardsParams(WIDTH_BREAKPOINT.md.cards);
    } else {
      setCardsParams(WIDTH_BREAKPOINT.sm.cards);
    }
  }, [windowWidth]);

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
        setCardsRendering(foundMovies);
      } else {
        const filtered = handleMovieFilter(foundMovies, filter, false);
        setCardsRendering(filtered);
        if (!filtered.length) {
          setCardsNotFound(true);
        }
      }
    }
  }, []);

  return (
    <main className="movies">
      <Header onHamburgerClick={onHamburgerClick}/>
      <SearchForm
        onSearch={cbSearchSibmit}
        onFilterChange={cbFilterMovies}
        isFilterOn={isFilterOn}
        isSearching={isSearching}
      />
      <MoviesCardList
        cards={cardsRendering}
        savedCards={savedCards}
        cardsParams={cardsParams}
        isCardsNotFound={isCardsNotFound}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isLoading={isLoading}
      />
      <Footer />
    </main>
  );

}

export default Movies;

