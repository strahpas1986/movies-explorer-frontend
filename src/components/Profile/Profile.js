import { useContext, useEffect, useState } from "react";
import useValidation from "../../utils/useValidation";

import "./Profile.scss";

import Header from "../Header/Header";
import Form from "../Form/Form";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { NAME_REG_EXP } from "../../utils/constants";
import FormTitle from "../FormTitle/FormTitle";

function Profile({ onUpdateUser, onLogout, onLoading, onHamburgerClick }) {

  const currentUser = useContext(CurrentUserContext);
  const [isCurrentUser, setCurrentUserD] = useState(true);
  const [isEditingBegun, setEditingStatus] = useState(false);
  const { values, errors, isFormValid, onChange, resetValidation } = useValidation();

  useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email
      ? setCurrentUserD(false)
      : setCurrentUserD(true);
  }, [currentUser, values]);

  useEffect(() => {
    resetValidation(false, currentUser);
  }, [resetValidation, currentUser]);

  function handleEditClick() {
    setEditingStatus(!isEditingBegun);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <main className="profile">
      <Header onHamburgerClick={onHamburgerClick}/>
      <section className="profile__wrapper">
        <FormTitle
          title={`Привет, ${currentUser.name || ""}!`}
          place="edit-profile"
        />
        <Form
          name="edit-profile"
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          isCurrentUser={isCurrentUser}
          buttonText={onLoading ? "Сохранение..." : "Сохранить"}
          isEditingBegun={isEditingBegun}
        >
          <label className="form__input-wrapper form__input-wrapper_type_edit-profile">
            Имя
            <input
              className={`form__input form__input_type_edit-profile ${
                errors.name ? "form__input_style_error" : ""
              }`}
              type="text"
              name="name"
              form="edit-profile"
              required
              minLength="2"
              maxLength="30"
              pattern={NAME_REG_EXP}
              id="name-input"
              disabled={isEditingBegun && !onLoading ? false : true}
              onChange={onChange}
              value={values.name || ""}
            />
          </label>
          <label className="form__input-wrapper form__input-wrapper_type_edit-profile">
            E-mail
            <input
              className={`form__input form__input_type_edit-profile ${
                errors.email ? "form__input_style_error" : ""
              }`}
              type="email"
              name="email"
              form="edit-profile"
              required
              id="email-input"
              disabled={isEditingBegun && !onLoading ? false : true}
              onChange={onChange}
              value={values.email || ""}
            />
          </label>
          <div
            className={`form__errors-wrapper ${
              errors.name || errors.email ? "form__errors-wrapper_active" : ""
            }`}
          >
            <div className="form__error-wrapper">
              <p
                className={`form__error-name ${
                  errors.name ? "form__error-name_active" : ""
                }`}
              >
                Имя:
              </p>
              <span
                className={`form__input-error form__input-error_type_edit-profile ${
                  errors.name ? "form__input-error_active" : ""
                }`}
              >
                {errors.name || ""}
              </span>
            </div>
            <div className="form__error-wrapper">
              <p
                className={`form__error-name ${
                  errors.email ? "form__error-name_active" : ""
                }`}
              >
                E-mail:
              </p>
              <span
                className={`form__input-error form__input-error_type_edit-profile ${
                  errors.email ? "form__input-error_active" : ""
                }`}
              >
                {errors.email || ""}
              </span>
            </div>
          </div>
        </Form>
        <div
          className={`profile__actions-wrapper ${
            isEditingBegun ? "profile__actions-wrapper_hidden" : ""
          }`}
        >
          <button
            className="profile__btn-action profile__btn-action_type_edit"
            type="button"
            onClick={handleEditClick}
          >
            Редактировать
          </button>
          <button
            className="profile__btn-action profile__btn-action_type_exit"
            type="button"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
