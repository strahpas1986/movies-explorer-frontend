// Импорт пакетов
import { useLocation } from "react-router-dom";

// Импорт стилей
import "./MoviesCard.css";

// Компонент MoviesCard
function MoviesCard({ card, isLiked, onCardLike }) {

  const location = useLocation();

  function handleConvertDuration(duration) {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="movies-card">
      <img
        className="movies-card__img"
        src={`https://api.nomoreparties.co${card.image.url}`} // Временный вариант
        alt={`Постер фильма ${card.nameRU}`}
      />
      <div className="movies-card__caption">
        <p className="movies-card__name">{card.nameRU}</p>
        {location.pathname === "/movies" ? (
          <div className="movies-card__btn-action">
            <button className={`movies-card__btn-like-img ${isLiked ? "movies-card__btn-like-img_active" : ""}`} type="button" onClick={handleLikeClick}></button>
          </div>
        ) : (
          <button
            className="movies-card__btn-action movies-card__btn-action_place_saved-movies"
            type="button"
            aria-label="Удалить фильм из сохранённых"
          >
          </button>
        )}
      </div>
      <p className="movies-card__duration">
        {handleConvertDuration(card.duration)}
      </p>
    </li>
  );
}

export default MoviesCard;
