import "./Hamburger.scss";

import Overlay from "../Overlay/Overlay";
import Navigation from "../Navigation/Navigation";
import AccountPage from "../AccountPage/AccountPage";

function Hamburger({ isSideMenuOpen, onClose }) {
  return (
    <Overlay isActive={isSideMenuOpen} onClose={onClose}>
      <div
        className={`hamburger ${
          isSideMenuOpen ? "hamburger_active" : ""
        }`}
      >
        <button
          className="hamburger__btn-close"
          type="button"
          aria-label="Закрыть меню"
          onClick={onClose}
        ></button>
        <Navigation isSideMenu={true} onClose={onClose} />
        <AccountPage isSideMenu={true} onClose={onClose} />
      </div>
    </Overlay>
  );
}

export default Hamburger;
