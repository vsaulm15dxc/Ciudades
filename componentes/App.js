import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuscarScreen from './BuscarScreen/BuscarScreen';
import HistorialScreen from './Historial/HistorialScreen';
import { HistorialProvider } from './Historial/HistorialProvider';
import NotFoundScreen from './PantallaError/NotFoundScreen';


function App() {
  return (

      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<BuscarScreen />} />
            <Route path="/Historial" element={<HistorialScreen />} />
            <Route path='*' element={<NotFoundScreen />} />
          </Routes>
        </div>
      </Router>
  );
}

export default function AppWrapper (){
  return (
    <HistorialProvider>
      <App />
    </HistorialProvider>
  )
}
