import React, { useState } from 'react';

function FormularioBusqueda({ onSearch }) {
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(postalCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Ingrese un código postal"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default FormularioBusqueda;
