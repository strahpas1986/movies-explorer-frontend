import { DURATION_MOV } from "./constants";

export const handleMovieSearch = (movies, searchQuery, isSavedMovies) => {
  const normalizeSearchQuery = searchQuery.toLowerCase();
  const result = movies.filter((movie) => {
    const normalizeNameRu = movie.nameRU.toLowerCase();
    const normalizeNameEn = movie.nameEN.toLowerCase();
    return (
      normalizeNameRu.includes(normalizeSearchQuery) ||
      normalizeNameEn.includes(normalizeSearchQuery)
    );
  });
  if (!isSavedMovies) {
    localStorage.setItem("foundMovies", JSON.stringify(result));
    localStorage.setItem("moviesSearchQuery", normalizeSearchQuery);
  } else {
    localStorage.setItem("savedMoviesSearchQuery", normalizeSearchQuery);
  }
  return result;
}

export const handleMovieFilter = (movies, isFilterOn, isSavedMovies) => {
  if (!isSavedMovies) {
    localStorage.setItem("isMoviesFilterOn", isFilterOn);
  } else {
    localStorage.setItem("isSavedMoviesFilterOn", isFilterOn);
  }
  if (isFilterOn) {
    const result = movies.filter((movie) => movie.duration <= DURATION_MOV);
    return result;
  } else {
    return movies;
  }
}
