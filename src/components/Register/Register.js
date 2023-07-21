import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { NAME_REG_EXP } from "../../utils/constants";
import useValidation from "../../utils/useValidation";

import './Register.css';

import FormCap from "../FormCap/FormCap";

function Register({
  onRegister,
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
    onRegister(values);
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main className="register">
      <FormCap
        title="Добро пожаловать!"
        name="register"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText={onLoading ? "Регистрация..." : "Зарегистрироваться"}
        serverErrorText={serverErrorText}
      >
        <label className="form__input-wrapper">
          Имя
          <input
            className={`form__input ${
              errors.name ? "form__input_style_error" : ""
            }`}
            type="text"
            name="name"
            form="register"
            required
            minLength="2"
            maxLength="30"
            pattern={NAME_REG_EXP}
            disabled={onLoading ? true : false}
            id="name-input"
            onChange={onChange}
            value={values.name || ""}
          />
          <span
            className={`form__input-error ${
              errors.name ? "form__input-error_active" : ""
            }`}
          >
            {errors.name || ""}
          </span>
        </label>
        <label className="form__input-wrapper">
          E-mail
          <input
            className={`form__input ${
              errors.email ? "form__input_style_error" : ""
            }`}
            type="email"
            name="email"
            form="register"
            required
            disabled={onLoading ? true : false}
            id="email-input"
            onChange={onChange}
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
            form="register"
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

export default Register;
