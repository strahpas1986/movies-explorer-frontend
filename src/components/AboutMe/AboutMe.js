// IMPORT STYLES
import "./AboutMe.css";

// IMPORT IMAGES
import author from "../../images/author-foto.jpg";

// IMPORT COMPONENTS
import SectionTitle from "../SectionTitle/SectionTitle";
import Portfolio from "../Portfolio/Portfolio";

// ABOUT ME COMPONENT
function AboutMe() {
  // CALCULATE AGE
  function calculateAge() {
    const birthDate = new Date(1986, 3, 21);
    const todayDate = new Date();
    const addOne =
      todayDate.getMonth() - birthDate.getMonth() >= 0 &&
      todayDate.getDate() - birthDate.getDate() >= 0;
    const diff = todayDate.getFullYear() - birthDate.getFullYear();
    return diff - 1 + (addOne ? 1 : 0);
  }

  return (
    <section className="about-me">
      <SectionTitle title="Студент" />
      <article className="about-me__bio">
        <h3 className="about-me__name">Владимир</h3>
        <p className="about-me__profession">
          Фронтенд-разработчик, {calculateAge()} лет
        </p>
        <p className="about-me__text">
          Я родился в Донецке в даннный момент живу в Москве, закончил факультет Строительства и эксплуатации железных дорог ДонИЖТ. Люблю читать книги в жанре фэнтези и фантастики, смотрю научно-фантастические фильмы и сериалы. В свободное от работы и учебы время люблю вязать. Очень понравилось программировать еще со школы. Сейчас осуществляю свою мечту по смене профессии на Web-разработку
        </p>
        <a
          className="about-me__link hover-link"
          href="https://github.com/strahpas1986"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <img
          className="about-me__img"
          src={author}
          alt="Фотография разработчика"
        />
      </article>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
