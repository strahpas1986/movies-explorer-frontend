// Импорт методов
import { makeRequest } from "./constants";

// импорт переменныъ
import { MOVIESAPI_URL } from "./constants";

// функция запроса карточек
export function getCards() {
  return makeRequest(MOVIESAPI_URL, "/beatfilm-movies", "GET");
}
