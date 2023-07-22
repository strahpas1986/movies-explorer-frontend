import { useEffect, useRef, useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import './App.css';

import AppLayout from "../AppLayout/AppLayout";
// import Header from '../Header/Header';
import Main from '../Main/Main';
// import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from "../Profile/Profile";
import Hamburger from '../Hamburger/Hamburger';
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";
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
  const [isPreloader, setPreloaderClass] = useState(true);
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [serverErrorText, setServerErrorText] = useState("");
  const ClickRef = useRef(null);
  const navigate = useNavigate();

  function handleScrollEffect(targetRef) {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  async function handleUpdateUser({ name, email }) {
    setLoading(true);
    try {
      const userData = await MainApi.updateUserInfo({ name, email });
      if (userData) {
        setCurrentUser(userData);
      }
    } catch (err) {
      setServerErrorText(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

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

  const cbTokenCheck = useCallback(async () => {
    try {
      const userData = await MainApi.getUserInfo();
      if (userData) {
        setLoggedIn(true);
        setCurrentUser(userData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPreloaderClass(false);
    }
  }, []);

  async function handleMoviesCardAll() {
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

  const handleSavedMoviesCards = useCallback(async () => {
    try {
      const moviesData = await MainApi.getCardsByOwner();
      if (moviesData) {
        setSavedCards(moviesData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

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

  useEffect(() => {
    cbTokenCheck();
  }, [loggedIn, cbTokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      handleSavedMoviesCards();
    }
  }, [loggedIn, handleSavedMoviesCards]);

  function handleOpenSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  function handleCloseSideMenu() {
    setSideMenuStatus(false);
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
                      onClick={handleScrollEffect}
                      aboutRef={ClickRef}
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
                      savedCards={savedCards}
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
            <Hamburger
              isSideMenuOpen={isSideMenuOpen}
              onClose={handleCloseSideMenu}
            />
          </CurrentUserContext.Provider>
        )}
    </div>
  );
}

export default App;
