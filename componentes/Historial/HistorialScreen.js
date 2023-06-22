import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import MainMenu from "../MenuMain/MainMenu";
import { HistoryContext } from "./HistorialProvider";
import "./HistorialScreen.css";

const HistorialScreen = () => {
  const navigate = useNavigate();
  const [historial] = useContext(HistoryContext);

  const handleNavigate = (codigoPostal) => {
    const buscarData = historial.find((item) => item.codigoPostal === codigoPostal);
    navigate("/", { state: { buscarData } });
  };

  return (
    <div className="historial-screen">
      <MainMenu />
      <h1>Historial de Búsqueda</h1>
      <table className="search-table">
        <tbody>
          {historial &&
            historial.map((item, index) => (
              <tr key={index} onClick={() => handleNavigate(item.codigoPostal)}>
                <td className="postal-code">{item.codigoPostal}</td>
                <td>
                  {item.city}({item.region})
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialScreen;
