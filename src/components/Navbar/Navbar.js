import { useAuth } from '../../contexts/AuthContext';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuToggle() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="navbarWrapper" data-testid="navbar-testid">
      <div className="navbarContainer">
        <input 
          className="side-menu" 
          type="checkbox" 
          id="side-menu" 
          checked={menuOpen} 
          onChange={handleMenuToggle} 
        />
        <label className="hamb" htmlFor="side-menu">
          <span className="hamb-line"></span>
        </label>
        
        <NavLink to="/" className="logo-text">єДоступність</NavLink>
        
        <div className={`buttonsContainer ${menuOpen ? 'mobile-menu-open' : ''}`}>
          {user ? (
            <>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                Профіль
              </NavLink>
              <NavLink to="/" onClick={() => { logout(); setMenuOpen(false); }}>
                Вийти
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                Вхід
              </NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                Реєстрація
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;