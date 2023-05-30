import React from 'react';
import {Link} from 'react-router-dom';
import MainMenu from './MainMenu';

function NotFoundScreen(){
    return(
        <div>
        <MainMenu />
        <h1>404</h1>
        <h2>Pagina no  Encontrada</h2>
        <p>La paginna que buscas no existe</p>
        <Link to="/">Volver a Buscar</Link>
        </div>
    );

}
export default NotFoundScreen