// Импорт пакетов
import { Link } from "react-router-dom";

// Импорт стилей
import "./AccountLink.css";

// компонент AccountLink
function AccountLink({ isSideMenu, onClose }) {
  return (
    <Link
      to="/profile"
      onClick={onClose}
      className={`account-link ${
        isSideMenu ? "account-link_place_side-menu" : "account-link_hidden"
      } hover-button`}
    >
      Аккаунт
    </Link>
  );
}

// экспорт компонента
export default AccountLink;
