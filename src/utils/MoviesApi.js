import { makeRequest } from "./config";

import { MAINAPI_URL } from "./constants";

export function register({ name, email, password }) {
  return makeRequest(MAINAPI_URL, "/signup", "POST", true, {
    name,
    email,
    password,
  });
}
