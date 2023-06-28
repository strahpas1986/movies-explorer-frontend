// Импорт стилей
import "./Main.css";

// Импорт компонентов
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Technology from "../Technology/Technology";
import AboutMe from "../AboutMe/AboutMe";

// Компонент Main
function Main({ aboutRef }) {
  return (
    <main className="main">
      <Promo aboutRef={aboutRef} />
      <AboutProject aboutRef={aboutRef} />
      <Technology />
      <AboutMe />
    </main>
  );
}

export default Main;
