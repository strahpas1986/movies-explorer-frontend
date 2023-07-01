// Импорт пакетов
import { Link } from "react-router-dom";

// Импорт стилей
import "./AuthScreen.css";

// Импорт компонентов
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import AuthTitle from "../AuthTitle/AuthTitle";

// Компонент AuthScreen
function AuthScreen({
  title,
  name,
  onSubmit,
  isFormValid,
  buttonText,
  ...props
}) {
  return (
    <section className="auth-screen">
      <Logo place="auth" />
      <AuthTitle title={title} />
      <Form
        name={name}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        buttonText={buttonText}
      >
        {props.children}
      </Form>
      {name === "register" ? (
        <p className="auth-screen__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="auth-screen__link hover-link">
            Войти
          </Link>
        </p>
      ) : (
        <p className="auth-screen__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="auth-screen__link hover-link">
            Регистрация
          </Link>
        </p>
      )}
    </section>
  );
}

export default AuthScreen;
