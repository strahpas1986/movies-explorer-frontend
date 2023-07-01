import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Импорт стилей
import "./MoviesCardList.css";

// Импорт компонентов
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

import { handleSavedStatus } from "../../utils/utils";

// Компонент MoviesCardList
function MoviesCardList({
  cards,
  savedCards,
  cardsParams,
  isCardsNotFound,
  onCardSave,
  onCardDelete,
  isLoading,
}) {

    const [cardsRender, setCardsRender] = useState([]);
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === "/movies" && cards.length) {
        const result = cards.filter((card, index) => {
          return index < cardsParams.total;
        });
        setCardsRender(result);
      }
    }, [location.pathname, cards, cardsParams]);

    useEffect(() => {
      if (location.pathname === "/saved-movies") {
        setCardsRender(cards);
      }
    }, [location.pathname, cards]);

    const handleButtonMore = () => {
      const start = cardsRender.length;
      const end = start + cardsParams.more;
      const count = cards.length - start;
      if (count > 0) {
        const additionalCards = cards.slice(start, end);
        setCardsRender([...cardsRender, ...additionalCards]);
      }
    }

    return (
      <section
        className="movies-card-list"
        aria-label="Секция с карточками фильмов"
      >
        {!localStorage.getItem("searchQuery") && cards.length === 0 && null}
        {isLoading && cards.length === 0 && <Preloader />}
        {isCardsNotFound && (
          <p className="movies-card-list__info">Ничего не&nbsp;найдено</p>
        )}
        {cards.length !== 0 && !isCardsNotFound && (
          <>
            <ul
              className={`movies-card-list__list ${
                cardsRender.length > 3 ? "movies-card-list__list_space-evenly" : ""
              }`}
            >
              {cardsRender.map((card) => (
                <MoviesCard
                  card={card}
                  key={card.id}
                  isSaved={handleSavedStatus(savedCards, card)}
                  onCardSave={onCardSave}
                  onCardDelete={onCardDelete}
                />
              ))}
            </ul>
            {cardsRender.length >= 5 && cardsRender.length < cards.length && (
              <button
                className="movies-card-list__btn-more hover-button"
                type="button"
                onClick={handleButtonMore}
              >
                Ещё
              </button>
            )}
          </>
        )}
      </section>
    );
}

export default MoviesCardList;
