// Импорт стилей
import "./AuthTitle.css";

// Компонент AuthTitle
function AuthTitle({ title, place }) {
  return (
    <h1
      className={`auth-title ${
        place === "edit-profile" ? "auth-title_place_edit-profile" : ""
      }`}
    >
      {title}
    </h1>
  );
}

export default AuthTitle;
