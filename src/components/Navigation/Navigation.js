import { Link, Routes, Route } from "react-router-dom";

import './Navigation.css';

function Navigation() {
  return (
    <div className="header__nav">
      <Routes>
        <Route
          exact
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          exact
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
      </Routes>
    </div>
  );
}

export default Navigation;
