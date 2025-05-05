// Importiere React sowie PropTypes zur Laufzeit-Typprüfung
import React from "react";
import PropTypes from "prop-types";

// Diese Komponente zeigt eine einzelne Veranstaltungskarte an
export function EventCard({ event }) {
  // Wandelt das Startdatum der Veranstaltung in ein Datum-Objekt um
  const date = new Date(event.startdate);

  // Formatierung im deutschen Datumsformat (z. B. 03.05.2025)
  const formattedDate = date.toLocaleDateString("de-DE");

  return (
    // Karte mit flexibler Anordnung: auf Mobil stacked, auf größer nebeneinander
    <div className="flex items-center bg-gray-100 rounded-md p-3 gap-3 flex-wrap sm:flex-nowrap w-full max-w-4xl mx-auto shadow-md">
      
      {/* Linker Kreis mit Icon */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-900 rounded-full flex items-center justify-center">
          <img
            src="/icons/party-icon.svg"
            alt="Event Icon"
            className="w-5 h-5 sm:w-8 sm:h-8"
          />
        </div>
      </div>

      {/* Rechter Textbereich */}
      <div className="flex flex-col text-left w-full">
        {/* Titelzeile: kleiner auf Handy, größer auf Desktop */}
        <h2 className="text-base sm:text-xl font-semibold tracking-wide uppercase">
          {event.title} <span className="font-light">| {formattedDate}</span>
        </h2>

        {/* Thema / Kategorie */}
        <p className="text-xs sm:text-sm text-gray-700 mt-1">
          {event.topic || ""}
        </p>
      </div>
    </div>
  );
}

// PropTypes zur Laufzeit-Typprüfung
EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    startdate: PropTypes.string.isRequired,
    topic: PropTypes.string
  }).isRequired
};
