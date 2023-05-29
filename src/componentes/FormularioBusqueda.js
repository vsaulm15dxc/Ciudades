import React, { useState } from 'react';
import './FormularioBusqueda.css';

function FormularioBusqueda({ onSearch }) {
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(postalCode);
  };

  return (
    <div className="formulario-busqueda">
      <input
        type="text"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Ingrese un código postal"
      />
      <button type="submit" onClick={handleSubmit}>
        Buscar
      </button>
    </div>
  );
}

export default FormularioBusqueda;

