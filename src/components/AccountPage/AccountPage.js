import { Link } from "react-router-dom";

import './AccountPage.scss';

function AccountPage({ isSideMenu, onClose }) {
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

export default AccountPage;
