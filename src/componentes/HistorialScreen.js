import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { HistoryContext } from "./HistoryContextProvider";

const HistorialScreen = () => {
  const { history } = useContext(HistoryContext);
  const navigate = useNavigate();

  const handleNavigate = (codigoPostal) => {
    navigate("/buscar/" + codigoPostal);
  };

  return (
    <div className="container-historial">
      {history.length === 0 ? (
        <p>
          No hay resultados de historial, realice alguna búsqueda previamente
          para consultarlo
        </p>
      ) : (
        history.map((item, index) => {
          return (
            <div
              className="item-historial"
              onClick={() => {
                handleNavigate(item.codigoPostal);
              }}
            >
              <div className="cp">{item.codigoPostal}</div>
              {item.nombreCiudad} ({item.comunidad})
            </div>
          );
        })
      )}
    </div>
  );
};

export default HistorialScreen;
