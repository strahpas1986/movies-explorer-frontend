// Импорт стилей
import "./SavedMovies.css";

// Импорт компонентов
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

// Компонент SavedMovies
function SavedMovies({ cards, onFilterChange, isFilterOn }) {
  return (
    <main className="saved-movies">
      <SearchForm onFilterChange={onFilterChange} isFilterOn={isFilterOn} />
      <MoviesCardList cards={cards} />
    </main>
  );
}

export default SavedMovies;
