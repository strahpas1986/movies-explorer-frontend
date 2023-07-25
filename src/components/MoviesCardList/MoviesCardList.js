import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  cards,
  savedCards,
  cardsParams,
  isCardsNotFound,
  onCardSave,
  onCardDelete,
  isLoading,
}) {

  const [cardsRendering, setCardsRendering] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/movies" && cards.length) {
      const result = cards.filter((card, index) => {
        return index < cardsParams.total;
      });
      setCardsRendering(result);
    }
  }, [location.pathname, cards, cardsParams]);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setCardsRendering(cards);
    }
  }, [location.pathname, cards]);

  const handleStatusSave = (savedCards, movieCard) => {
    return savedCards.find((card) => {
      return card.movieId === (movieCard.id || movieCard.movieId);
    });
  }

  const handleButtonMore = () => {
    const start = cardsRendering.length;
    const end = start + cardsParams.more;
    const count = cards.length - start;
    if (count > 0) {
      const additionalCards = cards.slice(start, end);
      setCardsRendering([...cardsRendering, ...additionalCards]);
    }
  }

  return (
    <section className="movies-card-list">
      {!localStorage.getItem("searchQuery") && cards.length === 0 && null}
        {isLoading && cards.length === 0 && <Preloader />}
        {isCardsNotFound && (
          <p className="movies-card-list__info">Ничего не&nbsp;найдено</p>
        )}
        {cards.length !== 0 && !isCardsNotFound && (
          <>
            <ul
              className={`movies-card-list__list ${
                cardsRendering.length > 3 ? "movies-card-list__list_space-evenly" : ""
              }`}
            >
              {cardsRendering.map((card) => (
                <MoviesCard
                  card={card}
                  key={card.id || card._id}
                  isLiked={handleStatusSave(savedCards, card)}
                  onLikeCard={onCardSave}
                  onDislikeCard={onCardDelete}
                />
              ))}
            </ul>
            {cardsRendering.length >= 5 && cardsRendering.length < cards.length && (
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
  )
}

export default MoviesCardList;
