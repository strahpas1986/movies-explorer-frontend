import { makeRequest } from "./constants";

import { MAINAPI_URL } from "./constants";

// Функция регистрации
export function register({ name, email, password }) {
  return makeRequest(MAINAPI_URL, "/signup", "POST", true, {
    name,
    email,
    password,
  });
}

// Функция авторизации
export function authorize({ email, password }) {
  return makeRequest(MAINAPI_URL, "/signin", "POST", true, {
    email,
    password,
  });
}

// Функция выхода из аккаунта
export function logout() {
  return makeRequest(MAINAPI_URL, "/signout", "POST", true);
}

// Функция получения информации о пользователе
export function getUserInfo() {
  return makeRequest(MAINAPI_URL, "/users/me", "GET", true);
}

// Функция обновления информации о пользователе
export function updateUserInfo({ name, email }) {
  return makeRequest(MAINAPI_URL, "/users/me", "PATCH", true, {
    name,
    email,
  });
}

// Функция рендеринга карточек
export function getCardsByOwner() {
  return makeRequest(MAINAPI_URL, "/movies", "GET", true);
}

// Функция записи карточки
export function createMovieCard({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
}) {
  return makeRequest(MAINAPI_URL, "/movies", "POST", true, {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  });
}

// Функция удаления карточки
export function deleteCard(id) {
  return makeRequest(MAINAPI_URL, `/movies/${id}`, "DELETE", true);
}
