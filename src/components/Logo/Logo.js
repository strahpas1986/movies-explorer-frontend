// Импорт пакетов
import { Link } from "react-router-dom";

// Импорт стилей
import "./Logo.css";

// Компонент Logo
function Logo({ place }) {
  return (
    <Link
      to="/"
      className={`logo ${
        place === "auth" ? "logo_place_auth" : ""
      } hover-button`}
      aria-label="Главная"
    >
      <div className="logo__img"></div>
    </Link>
  );
}

export default Logo;
