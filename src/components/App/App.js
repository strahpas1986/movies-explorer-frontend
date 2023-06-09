// Импорт пакетов
import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";

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

// Временная мера: импорт json
import moviesCards from "../../temp/data.json";
import moviesSavedCards from "../../temp/savedData.json";
import userData from "../../temp/userData.json";

// компонент App
function App() {
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isFilterOn, setFilter] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLiked, setLike] = useState(false); // Временный вариант
  const aboutOnClickRef = useRef(null);

  // Функция открытия меню
  function handleOpenSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  // Функция закрытия меню
  function handleCloseSideMenu() {
    setSideMenuStatus(false);
  }

  // Функция фильтра
  function handleFilterChange(evt) {
    setFilter(evt);
  }

  // Функция лайка (при добавлении функционала JS на 4 этапе будет переделана)
  function handleCardLike() {
    setLike(!isLiked);
  }

  // Функция эффекта скролла
  function handleScrollEffect(targetRef) {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Временно
  useEffect(() => {
    setCards(moviesCards);
    setSavedCards(moviesSavedCards);
  }, []);

  return (
    <div className="app__content">
      <Routes>
        <Route
          path="/"
          element={<AppLayout onHamburgerClick={handleOpenSideMenu} />}
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
              <Movies
                cards={cards}
                onFilterChange={handleFilterChange}
                isFilterOn={isFilterOn}
                isLiked={isLiked}
                onCardLike={handleCardLike}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                cards={savedCards}
                onFilterChange={handleFilterChange}
                isFilterOn={isFilterOn}
              />
            }
          />
          <Route path="/profile" element={<Profile user={userData} />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <HamburgerMenu
        isSideMenuOpen={isSideMenuOpen}
        onClose={handleCloseSideMenu}
      />
    </div>
  );
}

export default App;
