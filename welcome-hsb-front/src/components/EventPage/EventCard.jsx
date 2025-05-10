// Import der benötigten React-Bibliotheken
import PropTypes from "prop-types";

// Komponente zur Darstellung einer einzelnen Veranstaltungskarte
export function EventCard({ event, onClick }) {
  // Datum der Veranstaltung parsen und im deutschen Format anzeigen
  const date = new Date(event.Datum);
  const formattedDate = date.toLocaleDateString("de-DE");

  // Startzeit optional kürzen auf "hh:mm"
  let formattedTime = "";
  if (event.Startzeit) {
    const [hours, minutes] = event.Startzeit.split(":");
    formattedTime = `${hours}:${minutes}`;
  }

  return (
    // Gesamte Karte klickbar machen
    <div
      onClick={() => onClick(event)} // Klick löst onClick-Funktion aus
      // Mouse Cursor ändern
      // Hover-Effekt: Hintergrundfarbe ändern
      className="cursor-pointer hover:bg-gray-200 transition-colors duration-200 flex items-center bg-gray-100 rounded-md p-3 gap-3 flex-wrap sm:flex-nowrap w-full max-w-4xl mx-auto shadow-md"
    >
      {/* Linker Bereich mit rotem Kreis und Event-Icon */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-900 rounded-full flex items-center justify-center">
          <img
            src="/icons/party-icon.svg"
            alt="Event Icon"
            className="w-5 h-5 sm:w-8 sm:h-8"
          />
        </div>
      </div>

      {/* Rechter Bereich mit Titel, Datum und optionalem Thema */}
      <div className="flex flex-col text-left w-full">
        <h2 className="text-base sm:text-xl font-semibold tracking-wide uppercase">
          {event.Titel}{" "}
          <span className="font-light">
            | {formattedDate}
            {formattedTime && ` – ${formattedTime} Uhr`}
          </span>
        </h2>
        {/* Falls ein Topic vorhanden ist, wird es angezeigt */}
        <p className="text-xs sm:text-sm text-gray-700 mt-1">
          {event.Topic || ""}
        </p>
      </div>
    </div>
  );
}

// Typüberprüfung der Props – gibt dem Entwickler früh Feedback bei falscher Verwendung
// Definiert die Struktur der erwarteten Props
// event: Objekt mit den Eigenschaften Titel, Datum, Startzeit und Topic  
EventCard.propTypes = {
  event: PropTypes.shape({
    Titel: PropTypes.string.isRequired,      // Pflichtfeld: Titel der Veranstaltung
    Datum: PropTypes.string.isRequired,      // Pflichtfeld: Veranstaltungsdatum
    Startzeit: PropTypes.string,             // Optional: Startzeit
    Topic: PropTypes.string,                 // Optional: Thema/Kategorie
  }).isRequired,
  onClick: PropTypes.func.isRequired,        // Pflicht: Funktion zum Öffnen z. B. eines Modals
};
