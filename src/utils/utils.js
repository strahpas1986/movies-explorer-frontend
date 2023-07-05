// импорт переменных
import { SHORT_MOVIE } from "./constants";

// функция обращения к серверу
export function makeRequest(url, endpoint, method, credentials, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers };
  if (credentials) {
    config.credentials = "include";
  }
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${url}${endpoint}`, config).then((res) => {
    const result = res.json();
    return res.ok
      ? result
      : result.then((err) => Promise.reject(`${err.message}`));
  });
}

// функция фильтра фильмов
export function handleMovieFilter(movies, isFilterOn, isSavedMovies) {
  if (!isSavedMovies) {
    localStorage.setItem("isMoviesFilterOn", isFilterOn);
  } else {
    localStorage.setItem("isSavedMoviesFilterOn", isFilterOn);
  }
  if (isFilterOn) {
    const result = movies.filter((movie) => movie.duration <= SHORT_MOVIE);
    return result;
  } else {
    return movies;
  }
}

// функция поиска фильмов
export function handleMovieSearch(movies, searchQuery, isSavedMovies) {
  const normalizeSearchQuery = searchQuery.toLowerCase().trim();
  const result = movies.filter((movie) => {
    const normalizeNameRu = movie.nameRU.toLowerCase().trim();
    const normalizeNameEn = movie.nameEN.toLowerCase().trim();
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

// функция сохранения статуса
export function handleSavedStatus(savedCards, movieCard) {
  return savedCards.find((card) => {
    return card.movieId === (movieCard.id || movieCard.movieId);
  });
}

// функция генерации уникального ключа
export function generateKey(prefix) {
  return `${prefix}-${new Date().getTime()}`;
}


