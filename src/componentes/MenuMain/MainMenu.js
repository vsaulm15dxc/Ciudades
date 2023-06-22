import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MainMenu.css';
import logo from '../Images/logo.png';

function MainMenu() {
  const location = useLocation();

  return (
    <nav className="main-menu">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Ciudades</h1>
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Buscar
          </Link>
        </li>
        <li>
          <Link to="/historial" className={location.pathname === '/historialscreen' ? 'active' : ''}>
            Historial
          </Link>
        </li>
      </ul>
    </nav>
  );
}


export default MainMenu;
