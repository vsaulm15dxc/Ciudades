import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuscarScreen from './BuscarScreen';
import HistorialScreen from './HistorialScreen';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<BuscarScreen />} />
          <Route path="/historial" element={<HistorialScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
