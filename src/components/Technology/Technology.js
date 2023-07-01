// Импорт стилей
import "./Technology.css";

// Импорт компонента
import SectionTitle from "../SectionTitle/SectionTitle";

// компонент Technology
function Technology() {
  return (
    <section className="technology">
      <SectionTitle title="Технологии" />
      <h3 className="technology__title">7 технологий</h3>
      <p className="technology__text">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
        применили в&nbsp;дипломном проекте.
      </p>
      <ul className="technology__list">
        <li className="technology__list-item">
          <p className="technology__list-item-text">HTML</p>
        </li>
        <li className="technology__list-item">
          <p className="technology__list-item-text">CSS</p>
        </li>
        <li className="technology__list-item">
          <p className="technology__list-item-text">JS</p>
        </li>
        <li className="technology__list-item">
          <p className="technology__list-item-text">React</p>
        </li>
        <li className="technology__list-item">
          <p className="technology__list-item-text">Git</p>
        </li>
        <li className="technology__list-item">
          <p className="technology__list-item-text">Express.js</p>
        </li>
        <li className="technology__list-item">
          <p className="technology__list-item-text">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}

export default Technology;
