export const ESC_KEY = "Escape";

export const MOVIESAPI_URL = "https://api.nomoreparties.co";
export const MAINAPI_URL = "http://localhost:3002"; // для тестирования на локальном ПК, после заменить на Api удаленного сервера

export const USER_NAME_REG_EXP = "^[A-Za-zА-Яа-яЁё\\-\\s]+$";

export const SHORT_MOVIE = 40;

export const CARDS_PARAM = {
  desktop_full: {
    width: 1280,
    cards: {
      total: 16,
      more: 4,
    },
  },
  desktop: {
    width: 991,
    cards: {
      total: 12,
      more: 3,
    },
  },
  tablet: {
    width: 768,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 320,
    cards: {
      total: 5,
      more: 2,
    },
  }
}
