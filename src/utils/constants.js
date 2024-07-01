export const ESC_KEY = "Escape";

export const MOVIESAPI_URL = "https://api.nomoreparties.co";
export const MAINAPI_URL = "https://api.vladimirstrashnov.ru";
// export const MAINAPI_URL = "http://localhost:3002";

export const NAME_REG_EXP = "^[A-Za-zА-Яа-яЁё\\-\\s]+$";

export const DURATION_MOV = 40;

export const WIDTH_BREAKPOINT = {
  xl: {
    width: 1280,
    cards: {
      total: 16,
      more: 4,
    },
  },
  lg: {
    width: 991,
    cards: {
      total: 12,
      more: 3,
    },
  },
  md: {
    width: 768,
    cards: {
      total: 8,
      more: 2,
    },
  },
  sm: {
    width: 320,
    cards: {
      total: 5,
      more: 2,
    },
  }
}

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

