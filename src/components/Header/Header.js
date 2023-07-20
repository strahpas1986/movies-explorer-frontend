import Navigation from '../Navigation/Navigation';
// import AccountPage from '../AccountPage/AccountPage';
import logo from '../../images/logo.svg';

import './Header.css';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип дипломного проекта" className="header__image"/>
      <Navigation />
      {/* <AccountPage /> */}
    </header>
  )
}

export default Header;
