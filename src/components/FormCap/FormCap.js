import { Link } from "react-router-dom";
import FormTitle from "../FormTitle/FormTitle";
import Form from "../Form/Form";
import Logo from "../Logo/Logo";

import './FormCap.css';

function FormCap({
  title,
  name,
  onSubmit,
  isFormValid,
  buttonText,
  ...props
}) {
  return (
    <section className="form-cap">
      <Logo place='auth'/>
      <FormTitle title={title}/>
      <Form
        name={name}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        buttonText={buttonText}
      >
        {props.children}
      </Form>
      {name === "register" ? (
        <p className="form-cap__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="form-cap__link">
            Войти
          </Link>
        </p>
      ) : (
        <p className="form-cap__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="form-cap__link">
            Регистрация
          </Link>
        </p>
      )}
    </section>
  );
}

export default FormCap;
