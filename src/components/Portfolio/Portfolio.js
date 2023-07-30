// Импорт стилей
import "./Portfolio.css";

// Компонент Portfolio
function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://strahpas1986.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-symbol">&#x2197;</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://strahpas1986.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-symbol">&#x2197;</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://mesto-sp.nomoredomains.monster"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-symbol">&#x2197;</p>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
