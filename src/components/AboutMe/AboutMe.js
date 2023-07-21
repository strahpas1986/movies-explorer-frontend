import './AboutMe.css';

import NavTab from '../NavTab/NavTab';

import author from "../../images/author-foto.jpg";

function AboutMe() {
  return (
    <section className='about-me'>
      <NavTab title="Студент" />
      <article className="about-me__title">
        <h3 className="about-me__name">Владимир</h3>
        <p className="about-me__subtitle">
          Фронтенд-разработчик, 37 лет
        </p>
        <p className="about-me__descr">
          Я родился в Донецке в даннный момент живу в Москве, закончил факультет Строительства и эксплуатации железных дорог ДонИЖТ. Люблю читать книги в жанре фэнтези и фантастики, смотрю научно-фантастические фильмы и сериалы. В свободное от работы и учебы время люблю вязать. Очень понравилось программировать еще со школы. Сейчас осуществляю свою мечту по смене профессии на Web-разработку
        </p>
        <a
          className="about-me__link"
          href="https://github.com/strahpas1986"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <img
          className="about-me__image"
          src={author}
          alt="Фотография разработчика"
        />
      </article>
    </section>
  )
}

export default AboutMe;
