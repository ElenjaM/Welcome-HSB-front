// React-Hooks und PropTypes importieren
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Die EventWindow-Komponente zeigt Details zu einem Event in einem Popup an
export function EventWindow({ event, onClose }) {
  const modalRef = useRef(null);

  // Wenn kein Event übergeben wurde, wird das Fenster nicht gerendert
  if (!event) return null;

  // ESC-Taste schließt das Fenster
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose(); // Modal schließen bei ESC
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey); // Aufräumen
  }, [onClose]);

  // Setzt den Fokus auf das Modal nach dem Rendern (für Tastatur-Nutzer)
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  // Die vollständige URL zur Originalseite (sofern in der Datenbank vorhanden)
  const fullUrl = event.URL ? `https://www.hs-bremen.de${event.URL}` : null;

  // Datum der Veranstaltung im deutschen Format anzeigen (z.B 14:00 Uhr)
  let formattedTime = "";
  if (event.Startzeit) {
    const [hours, minutes] = event.Startzeit.split(":");
    formattedTime = `${hours}:${minutes}`;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
    >
      {/* Fensterblock */}
      <div
        className="bg-white rounded-lg p-6 max-w-3xl w-full shadow-xl relative outline-none"
        ref={modalRef}
        tabIndex={-1}
      >
        {/* Schließen-Button (oben rechts) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          aria-label="Fenster schließen"
        >
          ×
        </button>

        {/* Titel der Veranstaltung */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.Titel}</h2>

        {/* Beschreibung, inkl. Zeilenumbrüche */}
        <p className="mb-4 text-gray-700 whitespace-pre-line">
          {event.Beschreibung}
        </p>

        {/* Liste mit weiteren Details */}
        <ul className="text-sm space-y-1 text-gray-800">
          <li>
            <strong>📅 Datum:</strong>{" "}
            {new Date(event.Datum).toLocaleDateString("de-DE")}
          </li>
          {event.Startzeit && (
            <li>
              <strong>⏰ Startzeit:</strong> {formattedTime}
            </li>
          )}
          {event.Endzeit && (
            <li>
              <strong>⏳ Endzeit:</strong> {event.Endzeit}
            </li>
          )}
          {event.Ort && (
            <li>
              <strong>🏫 Ort:</strong> {event.Ort}
            </li>
          )}
        </ul>

        {/* Link zur Original-Veranstaltungsseite, sofern vorhanden */}
        {fullUrl && (
          <div className="mt-5">
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 text-sm"
            >
              Zur Veranstaltungsseite ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Prop-Typenvalidierung zur Laufzeit
EventWindow.propTypes = {
  event: PropTypes.object, // Erwartet ein Event-Objekt
  onClose: PropTypes.func.isRequired, // Funktion zum Schließen des Fensters
};
