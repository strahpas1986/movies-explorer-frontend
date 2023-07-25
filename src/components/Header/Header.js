import { Link, useLocation } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import AccountPage from '../AccountPage/AccountPage';
import Logo from '../Logo/Logo';

import './Header.css';

function Header({ onHamburgerClick, loggedIn }) {

  const location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' && `header__wrapper_condition`}`}>
      <div className={`header__wrapper ${location.pathname === '/' && `header__wrapper_condition`}`}>
        <Logo />
        {(location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile') && (
          <>
            <Navigation />
              <nav className='header__menu'>
                <AccountPage />
                <button
                  className="header__btn-hamburger"
                  type="button"
                  aria-label="Меню навигации"
                  onClick={onHamburgerClick}
                ></button>
              </nav>
          </>
        )}
        {(location.pathname === '/' && !loggedIn) && (
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
        </ul>)}
        {(location.pathname === '/' && loggedIn) && (
          <>
            <Navigation />
            <AccountPage />
            <button
              className="header__btn-hamburger"
              type="button"
              aria-label="Меню навигации"
              onClick={onHamburgerClick}
            ></button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header;
