import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuscarScreen from './BuscarScreen';
import HistorialScreen from './HistorialScreen';
import { HistorialProvider } from './HistorialProvider';
import NotFoundScreen from './NotFoundScreen';


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
