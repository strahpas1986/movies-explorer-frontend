// Импорт стилей
import "./Footer.scss";

// Компонент Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__list-item">
            <a
              className="footer__link"
              href="https://github.com/strahpas1986"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
