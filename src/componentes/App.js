import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuscarScreen from './BuscarScreen';
import HistorialScreen from './HistorialScreen';
import { HistoryContextProvider } from './HistoryContextProvider';

function App() {
  return (
    <HistoryContextProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<BuscarScreen />} />
            <Route path="/Historial" element={<HistorialScreen />} />
          </Routes>
        </div>
      </Router>
    </HistoryContextProvider>
  );
}

export default App;
