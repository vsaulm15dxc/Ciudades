import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from "react-router-dom";
import BuscarScreen from "./BuscarScreen";
import { HistoryContext } from "../HistorialProvider";
import { fetchZipopotam } from "../Servicios/fetchZipopotam";

// Mock del componente FetchZipopotam
jest.mock('./Servicios/fetchZipopotam', () => ({
  __esModule: true,
  fetchZipopotam: jest.fn().mockImplementationOnce(() => ({
    placeName: "La Llagosta",
    latitude: 41.5,
    longitude: 2.1833,
    region: 'State',
    regionAbbreviation: 'CT',
  })),
}));

// Mock del componente FetchOpenMeteo
jest.mock('./Servicios/fetchOpenMeteo', () => jest.fn(() => []));

describe('BuscarScreen', () => {
  const navigate = jest.fn();
  const mockLocation = {
    state: {
      historial: [],
    },
  };

  const mockReact = {
    useContext: () => [mockLocation.state.historial, jest.fn()],
    useState: () => [mockLocation.state.historial, jest.fn()],
  };

  const MockForm = () => {
    const { historial, setHistorial } = React.useContext(HistoryContext);
    const handleInputChange = (event) => {
      setHistorial(event.target.value);
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      //onSubmit(event);
    };
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} />
        <button type="submit" disabled={false}>
          Busca
        </button>
      </form>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('tiene que mostrar los resultados de busqueda despues de realiza una busqueda exitosa', () => {
    render(
      <MemoryRouter>
        <HistoryContext.Provider value={mockReact.useContext()}>
          <BuscarScreen />
        </HistoryContext.Provider>
      </MemoryRouter>
    );

    //Busqueda exitosa
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '08120' } });
    fireEvent.submit(screen.getByRole('button'));

    //verificacion de la llamada fetchZipopotam &fetchOpenMeteo
    expect(fetchZipopotam.mock).toHaveBeenCalledWith('08120');
    expect(require('../Servicios/fetchOpenMeteo')).toHaveBeenCalledWith(41.5, 2.1833);

    //comprovacion que se muestran los resultados de la busqueda
    expect(screen.getByText('Ciudad: La Llagosta')).toBeInTheDocument();
    expect(screen.getByText('Información Politica')).toBeInTheDocument();
    expect(screen.getByText('Información Climatica')).toBeInTheDocument();
    expect(screen.getByText('Información Geografica')).toBeInTheDocument();
  });

  test('mostrar mensaje de error confome a los datos introduccios no te llevan a ninguna parte (busqueda no exitosa)', () => {
    fetchZipopotam.mockImplementationOnce(() => {
      throw new Error('Error');
    });
    render(
      <MemoryRouter>
        <HistoryContext.Provider value={mockReact.useContext()}>
          <BuscarScreen />
        </HistoryContext.Provider>
      </MemoryRouter>
    );

    //Simulacion busqueda no exitosa
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '08120' } });
    fireEvent.submit(screen.getByRole('button'));

    expect(fetchZipopotam).toHaveBeenCalledWith('08120');
    expect(require('../Servicios/fetchOpenMeteo')).not.toHaveBeenCalled();
    expect(
      screen.getByText('Ha ocurrido un error, intenta cambiar el código postal o prueba más tarde')
    ).toBeInTheDocument();
  });
});