import './FormTitle.css';

function FormTitle({ title, place }) {
  return (
    <h1
      className={`form-title ${
        place === "edit-profile" ? "form-title_place_edit-profile" : ""
      }`}
      >
        {title}
    </h1>
  )
}

export default FormTitle;
