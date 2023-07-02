// Импорт пакетов
import { Outlet, useLocation } from "react-router-dom";

// Импорт компонентов
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Компонент AppLayout
function AppLayout({ onHamburgerClick }) {

  const location = useLocation();

  return (
    <>
      <Header onHamburgerClick={onHamburgerClick} />
      <Outlet />
      {location.pathname !== "/profile" && <Footer />}
    </>
  );
}

export default AppLayout;
