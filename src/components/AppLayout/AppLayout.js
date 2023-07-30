// Импорт пакетов
import { useLocation } from "react-router-dom";

// Импорт компонентов
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";

// Компонент AppLayout
function AppLayout({ onHamburgerClick, loggedIn }) {

  const location = useLocation();

  return (
    <>
      <Header onHamburgerClick={onHamburgerClick} loggedIn={loggedIn} />
      <Main />
      {location.pathname !== "/profile" && <Footer />}
    </>
  );
}

export default AppLayout;
