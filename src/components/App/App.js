import { useEffect, useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import './App.scss';

import AppLayout from '../AppLayout/AppLayout';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from "../Profile/Profile";
import Hamburger from '../Hamburger/Hamburger';
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import * as MainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";

import { MOVIESAPI_URL } from "../../utils/constants";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isInfoTooltipOpen ,setIsInfoTooltipOpen] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState({
    isSuccess: true,
    text: 'Вы успешно зарегистрировались!'
  });
  const [isLoading, setLoading] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [serverErrorText, setServerErrorText] = useState("");
  const navigate = useNavigate();

  // функция обновления данных пользователя
  async function handleUpdateUser({ name, email }) {
    setLoading(true);
    try {
      const userData = await MainApi.updateUserInfo({ name, email });
      if (userData) {
        setCurrentUser(userData);
        setIsSuccessInfoTooltipStatus({isSuccess:true, text:'Данные успешно обновлены!'});
        setIsInfoTooltipOpen(true);
      }
    } catch (err) {
      setServerErrorText(err);
      setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Что-то пошло не так! Попробуйте ещё раз.'});
      setIsInfoTooltipOpen(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // функция авторизации пользователя
  async function handleAuthorize({ email, password }) {
    setLoading(true);
    try {
      const userData = await MainApi.authorize({ email, password });
      if (userData) {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        setIsSuccessInfoTooltipStatus({isSuccess:true, text:'Вы успешно вошли в аккаунт!'});
        setIsInfoTooltipOpen(true);
      }
    } catch (err) {
      setServerErrorText(err);
      setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Что-то пошло не так! Попробуйте ещё раз.'});
      setIsInfoTooltipOpen(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // функция регистрации пользователя
  async function handleRegistration({ name, email, password }) {
    setLoading(true);
    try {
      const userData = await MainApi.register({ name, email, password });
      if (userData) {
        handleAuthorize({ email, password });
        setIsSuccessInfoTooltipStatus({isSuccess:true, text:'Вы успешно зарегистрировались!'});
        setIsInfoTooltipOpen(true);
        navigate("/movies", { replace: true });
      }
    } catch (err) {
      setServerErrorText(err);
      setIsSuccessInfoTooltipStatus({isSuccess: false, text:'Что-то пошло не так! Попробуйте ещё раз.'});
      setIsInfoTooltipOpen(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // функция выхода из аккаунта
  async function handleLogout() {
    try {
      const data = await MainApi.logout();
      if (data) {
        setLoggedIn(false);
        setCurrentUser({});
        setSavedCards([]);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  // функция получения токена
  const cbTokenCheck = useCallback(async () => {
    try {
      const userData = await MainApi.getUserInfo();
      if (userData) {
        setLoggedIn(true);
        setCurrentUser(userData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // функция сохранения всех карточек
  async function handleSavedAllMoviesCard() {
    setLoading(true);
    try {
      const moviesData = await MoviesApi.getCards();
      if (moviesData) {
        return moviesData;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // функция лайка в Сохраненые фильмы
  const handleLikeMovies = useCallback(async () => {
    try {
      const moviesData = await MainApi.getCardsByOwner();
      if (moviesData) {
        setSavedCards(moviesData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // функция рендеринга карточек на странице
  async function handleSaveMovie(movie) {
    try {
      const movieData = await MainApi.createMovieCard({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIESAPI_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIESAPI_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
      if (movieData) {
        setSavedCards([movieData, ...savedCards]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // функция удаления карточки из Сохраненные фильмы
  async function handleDeleteMovieBySaved(movie) {
    const savedMovie = savedCards.find(
      (card) => card.movieId === movie.id || card.movieId === movie.movieId
    );
    try {
      const data = await MainApi.deleteCard(savedMovie._id);
      if (data) {
        setSavedCards((state) =>
          state.filter((card) => card._id !== savedMovie._id)
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  const closeAllPopups = () => {
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    cbTokenCheck();
  }, [loggedIn, cbTokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      handleLikeMovies();
    }
  }, [loggedIn, handleLikeMovies]);

  // функция открытия и закрытия гамбургера
  function handleOpenAndCloseSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  return (
    <div className="app__content">
      <CurrentUserContext.Provider value={currentUser}>
            <Routes>
              <Route
                path="/"
                element={
                  <AppLayout
                    onHamburgerClick={handleOpenAndCloseSideMenu}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    savedCards={savedCards}
                    onSearch={handleSavedAllMoviesCard}
                    onCardSave={handleSaveMovie}
                    onCardDelete={handleDeleteMovieBySaved}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                    onHamburgerClick={handleOpenAndCloseSideMenu}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    savedCards={savedCards}
                    onCardDelete={handleDeleteMovieBySaved}
                    loggedIn={loggedIn}
                    onHamburgerClick={handleOpenAndCloseSideMenu}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={Profile}
                    onUpdateUser={handleUpdateUser}
                    onLogout={handleLogout}
                    onLoading={isLoading}
                    loggedIn={loggedIn}
                    onHamburgerClick={handleOpenAndCloseSideMenu}
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <Login
                    onLogin={handleAuthorize}
                    onLoading={isLoading}
                    serverErrorText={serverErrorText}
                    setServerErrorText={setServerErrorText}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Register
                    onRegister={handleRegistration}
                    onLoading={isLoading}
                    serverErrorText={serverErrorText}
                    setServerErrorText={setServerErrorText}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Hamburger
              isSideMenuOpen={isSideMenuOpen}
              onClose={handleOpenAndCloseSideMenu}
            />
            <InfoTooltip
              name = 'register'
              isOpen = {isInfoTooltipOpen}
              onClose = {closeAllPopups}
              isSuccessInfoTooltipStatus = {isSuccessInfoTooltipStatus}
            />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
