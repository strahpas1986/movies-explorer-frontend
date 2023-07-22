import { Link, useLocation } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import AccountPage from '../AccountPage/AccountPage';
import logo from '../../images/logo.svg';

import './Header.css';

function Header({ onHamburgerClick, loggedIn }) {

  const location = useLocation();

  return (
    <header className="header">
      {loggedIn ? (
        <div
          className={`header__wrapper ${
            location.pathname === '/' ? 'header__wrapper_condition' : ''
          }`}>
            <img src={logo} alt="Логотип дипломного проекта" className="header__image"/>
            <Navigation />
            <AccountPage />
            <button
              className="header__btn-hamburger"
              type="button"
              aria-label="Меню навигации"
              onClick={onHamburgerClick}
            ></button>
          </div>
      ) : (
        <div className='header__wrapper header__wrapper_condition'>
          <img src={logo} alt="Логотип дипломного проекта" className="header__image"/>
          <nav className='header__menu'>
            <ul className='header__menu_wrapper'>
              <li className='header__menu_item'>
                <Link to="/signup" className='header__link'>
                  Регистрация
                </Link>
              </li>
              <li className='header__menu_item'>
                <Link to="/signin" className='header__link header__link_type-login'>
                  Войти
                </Link>
              </li>
            </ul>

          </nav>
        </div>
      )}
    </header>
  )
}

export default Header;
