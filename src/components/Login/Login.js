import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useValidation from "../../utils/useValidation";

import './Login.css';

import FormCap from "../FormCap/FormCap";

function Login({
  onLogin,
  onLoading,
  serverErrorText,
  setServerErrorText,
  loggedIn,
}) {

  const { values, errors, isFormValid, onChange } = useValidation();

  useEffect(() => {
    setServerErrorText("");
  }, [setServerErrorText]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="login">
      <FormCap
        title="Рады видеть!"
        name="login"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText={onLoading ? "Вход..." : "Войти"}
        serverErrorText={serverErrorText}
      >
        <label className="form__input-wrapper">
          E-mail
          <input
            className={`form__input ${
              errors.email ? "form__input_style_error" : ""
            }`}
            type="email"
            name="email"
            form="login"
            required
            id="email-input"
            onChange={onChange}
            disabled={onLoading ? true : false}
            value={values.email || ""}
          />
          <span
            className={`form__input-error ${
              errors.email ? "form__input-error_active" : ""
            }`}
          >
            {errors.email || ""}
          </span>
        </label>
        <label className="form__input-wrapper">
          Пароль
          <input
            className={`form__input ${
              errors.password ? "form__input_style_error" : ""
            }`}
            type="password"
            name="password"
            form="login"
            required
            minLength="6"
            maxLength="30"
            disabled={onLoading ? true : false}
            id="password-input"
            onChange={onChange}
            value={values.password || ""}
          />
          <span
            className={`form__input-error ${
              errors.password ? "form__input-error_active" : ""
            }`}
          >
            {errors.password || ""}
          </span>
        </label>
      </FormCap>
    </main>
  );
}

export default Login;
