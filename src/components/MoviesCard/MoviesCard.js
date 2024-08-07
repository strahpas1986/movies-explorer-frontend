import { useLocation } from "react-router-dom";

import "./MoviesCard.scss";

import { MOVIESAPI_URL } from "../../utils/constants";

function MoviesCard({ card, isLiked, onLikeCard, onDislikeCard }) {

  const location = useLocation();

  const handleLikeCard = () => {
    onLikeCard(card);
  }

  const handleDislikeCard = () => {
    onDislikeCard(card);
  }

  const handleConvertDuration = (duration) => {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  return (
    <li className="movies-card">
      <a
        className="movies-card__link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
          <img
            className="movies-card__img"
            src={
              location.pathname === "/movies"
                ? `${MOVIESAPI_URL}${card.image.url}`
                : `${card.image}`
            }
            alt={`Постер фильма ${card.nameRU}`}
          />
      </a>
      <div className="movies-card__caption">
        <p className="movies-card__name">{card.nameRU}</p>
        {location.pathname === "/movies" ? (
          <div className="movies-card__btn-action">
            <button
              className={`movies-card__btn-like-img ${isLiked ? "movies-card__btn-like-img_active" : ""}`}
              type="submit"
              onClick={isLiked ? handleDislikeCard : handleLikeCard}
            ></button>
          </div>
        ) : (
          <button
            className="movies-card__btn-action movies-card__btn-action_place_saved-movies"
            type="button"
            aria-label="Удалить фильм из сохранённых"
            onClick={handleDislikeCard}
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
