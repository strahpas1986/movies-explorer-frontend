// Импорт пакетов
import { useNavigate } from "react-router-dom";

// Импорт стилей
import "./NotFound.css";

// Компонент NotFound
function NotFound() {

  const navigate = useNavigate();

  function handleBackClick() {
    navigate(-1);
  }

  return (
    <main className="not-found">
      <section className="not-found__wrapper">
        <p className="not-found__title">404</p>
        <h1 className="not-found__text">Страница не найдена</h1>
        <button
          className="not-found__btn-back hover-link"
          type="button"
          onClick={handleBackClick}
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;
