import React, { createContext, useState } from 'react';

export const HistoryContext = createContext();

export const HistorialProvider = ({ children }) => {
  const [historial, setHistorial] = useState([]);

  return (
    <HistoryContext.Provider value={[historial, setHistorial]}>
      {children}
    </HistoryContext.Provider>
  );
};
