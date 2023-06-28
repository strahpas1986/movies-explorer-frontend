// Импорт пакетов
import { Outlet, useLocation } from "react-router-dom";

// Импорт компонентов
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Компонент AppLayout
function AppLayout({ onHamburgerClick, loggedIn }) {

  const location = useLocation();

  return (
    <>
      <Header onHamburgerClick={onHamburgerClick} loggedIn={loggedIn} />
      <Outlet />
      {location.pathname !== "/profile" && <Footer />}
    </>
  );
}

export default AppLayout;
