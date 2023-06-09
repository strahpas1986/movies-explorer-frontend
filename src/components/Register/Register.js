// Импорт пакетов
import useValidation from "../../hooks/useValidation";

// Импорт стилей
import "./Register.css";

// Импорт компонентов
import AuthScreen from "../AuthScreen/AuthScreen";

// Компонент Register
function Register() {

  const { values, errors, isFormValid, onChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="registr">
      <AuthScreen
        title="Добро пожаловать!"
        name="register"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText="Зарегистрироваться"
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
            placeholder="Имя"
            minLength="2"
            maxLength="30"
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
            placeholder="pochta@yandex.ru"
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
            placeholder="Password"
            minLength="6"
            maxLength="30"
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
      </AuthScreen>
    </main>
  );
}

export default Register;
