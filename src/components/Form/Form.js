// Импорт стилей
import "./Form.scss";

// Компонент Form
function Form({
  name,
  onSubmit,
  isFormValid,
  isCurrentUser,
  buttonText,
  isEditingBegun,
  ...props
}) {

  function handleDisable() {
    if (name === "edit-profile") {
      return isFormValid && !isCurrentUser ? false : true;
    } else {
      return isFormValid ? false : true;
    }
  }

  return (
    <form
      action="#"
      name={`${name}`}
      id={`${name}`}
      className={`form form_type_${name}`}
      noValidate
      onSubmit={onSubmit}
    >
      {props.children}
      <button
        type="submit"
        form={`${name}`}
        className={`form__btn-submit ${
          name === "edit-profile" && !isEditingBegun
            ? "form__btn-submit_hidden"
            : ""
        } hover-button`}
        disabled={handleDisable()}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
