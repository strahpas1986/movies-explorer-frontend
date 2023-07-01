// Импорт пакетов
import { useEffect, useRef, useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";

// Импорт стилей
import "./App.css";

// Импорты компонентов
import AppLayout from "../AppLayout/AppLayout";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// импорт API
import * as MainApi from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";

// импорт переменных
import { MOVIESAPI_URL } from "../../utils/constants";

// компонент App
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isPreloader, setPreloaderClass] = useState(true);
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [serverErrorText, setServerErrorText] = useState("");
  const [isSearchError, setSearchError] = useState(false);
  const aboutOnClickRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useNotification();

  // функция редактирования пользователя
  async function handleUpdateUser({ name, email }) {
    setLoading(true);
    try {
      const userData = await MainApi.updateUserInfo({ name, email });
      if (userData) {
        setCurrentUser(userData);
        dispatch({
          type: "SUCCES",
          message: "Профиль успешно обновлён",
        })
      }
    } catch (err) {
      setServerErrorText(err);
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
      }
    } catch (err) {
      setServerErrorText(err);
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
        navigate("/movies", { replace: true });
      }
    } catch (err) {
      setServerErrorText(err);
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

  // функция сохранения токена
  const handleTokenCheck = useCallback(async () => {
    try {
      const userData = await MainApi.getUserInfo();
      if (!userData) {
        throw new Error("Данные пользователя отсутствуют");
      }
      // setEmail(user.email);
      setLoggedIn(true);
      setCurrentUser(userData);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setPreloaderClass(false);
    }
  }, [navigate]);

  // функция загрузки карточек фильмов
  async function handleMoviesCardAll() {
    setLoading(true);
    setSearchError(false);
    try {
      const moviesData = await MoviesApi.getCards();
      if (moviesData) {
        return moviesData;
      }
    } catch (err) {
      setSearchError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Функция сохранения карточек фильмов пользователем
  const handleGetUserMoviesCards = useCallback(async () => {
    try {
      const moviesData = await MainApi.getCardsByOwner();
      if (moviesData) {
        setSavedCards(moviesData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // функция сохранения карточек
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

  // функция удаления карточек из сохраненных
  async function handleDeleteMovie(movie) {
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

  // вход пользователя
  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn, handleTokenCheck]);

  // сохранение карточек фильмов
  useEffect(() => {
    if (loggedIn) {
      handleGetUserMoviesCards();
    }
  }, [loggedIn, handleGetUserMoviesCards]);

  // Функция открытия меню
  function handleOpenSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  // Функция закрытия меню
  function handleCloseSideMenu() {
    setSideMenuStatus(false);
  }

  // Функция эффекта скролла
  function handleScrollEffect(targetRef) {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="app__content">
      {isPreloader ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout
                  onHamburgerClick={handleOpenSideMenu}
                  loggedIn={loggedIn}
                />
              }
            >
              <Route
                index
                element={
                  <Main
                  onAnchorClick={handleScrollEffect}
                  aboutRef={aboutOnClickRef}
                />
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    element={Movies}
                    savedCards={savedCards}
                    onSearch={handleMoviesCardAll}
                    isSearchError={isSearchError}
                    onCardSave={handleSaveMovie}
                    onCardDelete={handleDeleteMovie}
                    isLoading={isLoading}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    cards={savedCards}
                    onCardDelete={handleDeleteMovie}
                    loggedIn={loggedIn}
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
                    serverErrorText={serverErrorText}
                    setServerErrorText={setServerErrorText}
                    loggedIn={loggedIn}
                  />
                }
              />
            </Route>
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
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <HamburgerMenu
            isSideMenuOpen={isSideMenuOpen}
            onClose={handleCloseSideMenu}
          />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
