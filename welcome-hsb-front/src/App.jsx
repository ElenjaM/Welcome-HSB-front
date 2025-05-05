// Importiere React-Bibliothek
import React from 'react';

// Importiere Routing-Komponenten aus react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importiere Seitenkomponenten
import HomePage from './components/Main/HomePage';     // Startseite
import EventPage from './components/EventPage/EventPage'; // Eventseite

// Hauptkomponente der Anwendung
export default function App() {
  return (
    // Initialisiert den Router für client-seitige Navigation
    <Router>
      {/* Definiert die verschiedenen Seiten (Routen) der Anwendung */}
      <Routes>
        {/* Route für die Startseite (unter "/") */}
        <Route path="/" element={<HomePage />} />
        {/* Route für die Veranstaltungsseite (unter "/events") */}
        <Route path="/events" element={<EventPage />} />
      </Routes>
    </Router>
  );
}
