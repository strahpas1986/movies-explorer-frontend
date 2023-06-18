// IMPORT PACKAGES
import { useLocation } from "react-router-dom";

// IMPORT STYLES
import "./MoviesCard.css";

// MOVIES CARD COMPONENT
function MoviesCard({ card, isLiked, onCardLike }) {
  // HOOKS
  const location = useLocation();

  // HANDLER CONVERT DURATION
  function handleConvertDuration(duration) {
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
      <img
        className="movies-card__img"
        src={`https://api.nomoreparties.co${card.image.url}`} // !TEMP: Временный вариант
        alt={`Постер фильма ${card.nameRU}`}
      />
      <div className="movies-card__caption">
        <p className="movies-card__name">{card.nameRU}</p>
        {location.pathname === "/movies" ? (
          <button
            className="movies-card__btn-action hover-button"
            type="button"
            aria-label="Добавить в сохранённые фильмы"
            onClick={onCardLike}
          >
            {/* <svg
              className={`movies-card__btn-like-img ${
                isLiked ? "movies-card__btn-like-img_active" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#F4F4F4"
                d="M14 17C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5C10.6863 5 8 7.68629 8 11C8 14.3137 10.6863 17 14 17ZM14 19C18.4183 19 22 15.4183 22 11C22 6.58172 18.4183 3 14 3C9.58172 3 6 6.58172 6 11C6 15.4183 9.58172 19 14 19Z"
              />

            </svg> */}
            <svg
              className={`movies-card__btn-like-img ${
                isLiked ? "movies-card__btn-like-img_active" : ""
              }`}
              width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_35657_5470)">
              <rect x="6" y="3" width="16" height="16" rx="8" fill="#F4F4F4"/>
              </g>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 17C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5C10.6863 5 8 7.68629 8 11C8 14.3137 10.6863 17 14 17ZM14 19C18.4183 19 22 15.4183 22 11C22 6.58172 18.4183 3 14 3C9.58172 3 6 6.58172 6 11C6 15.4183 9.58172 19 14 19Z" fill="white"/>
              <defs>
              <filter id="filter0_d_35657_5470" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="3"/>
              <feGaussianBlur stdDeviation="3"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35657_5470"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_35657_5470" result="shape"/>
              </filter>
              </defs>
            </svg>

          </button>
        ) : (
          <button
            className="movies-card__btn-action movies-card__btn-action_place_saved-movies"
            type="button"
            aria-label="Удалить фильм из сохранённых"
          >
            <svg
              className="movies-card__btn-del-img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                fillRule="evenodd"
                d="m4 5.06 2.652 2.652 1.06-1.06L5.061 4l2.651-2.652-1.06-1.06L4 2.939 1.348.287.288 1.348 2.939 4 .287 6.652l1.061 1.06L4 5.061Z"
                clipRule="evenodd"
              />
            </svg>
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
