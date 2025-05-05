// Importiere React und PropTypes für Typüberprüfung
import React from "react";
import PropTypes from "prop-types";

// Importiere lokale Eventdaten (JSON-Datei)
import localEvents from "../../data/events.json";

// Extrahiere alle eindeutigen "topic"-Werte aus der Eventliste
// - `filter(Boolean)` entfernt leere/null-Werte
// - `new Set(...)` sorgt dafür, dass jeder Topic nur einmal vorkommt
const uniqueTopics = Array.from(
  new Set(localEvents.map((e) => e.topic).filter(Boolean))
);

// Erstelle eine Liste von Kategorie-Objekten mit Label, Value und Icon
const categories = uniqueTopics.map((topic) => ({
  label: topic,                // Anzeigename
  value: topic,                // Wert zum Filtern
  icon: "/icons/default.svg", // Platzhalter-Icon (könnte dynamisch angepasst werden)
}));

// Hauptkomponente FilterPanel
export function FilterPanel({ filter, setFilter }) {
  // Funktion zum Ein-/Ausschalten einer Kategorie
  function toggleCategory(category) {
    const current = filter.categories;

    // Wenn Kategorie schon ausgewählt ist, entferne sie – sonst füge sie hinzu
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];

    // Setze neuen Filterzustand
    setFilter({ ...filter, categories: updated });
  }

  return (
    <div className="bg-white border rounded-md shadow-md p-4 w-[90vw] max-w-sm sm:w-80">
      {/* Datumsbereich-Auswahl (von / bis) */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Von</span>
          <input
            type="date"
            value={filter.dateFrom}
            onChange={(e) =>
              setFilter({ ...filter, dateFrom: e.target.value })
            }
            className="border px-2 py-1 rounded text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Bis</span>
          <input
            type="date"
            value={filter.dateTo}
            onChange={(e) =>
              setFilter({ ...filter, dateTo: e.target.value })
            }
            className="border px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      {/* Liste aller Kategorien mit Checkboxen */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.value}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleCategory(cat.value)} // Klick auf gesamte Zeile toggelt
          >
            {/* Kontrollkästchen: zeigt an, ob Kategorie aktiv ist */}
            <input
              type="checkbox"
              checked={filter.categories.includes(cat.value)}
              readOnly // readOnly, weil wir state-gesteuert toggeln
            />
            {/* Icon für die Kategorie */}
            <img src={cat.icon} alt="" className="w-5 h-5" />
            {/* Label anzeigen */}
            <span className="text-sm">{cat.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Typdefinitionen zur besseren Fehlererkennung
FilterPanel.propTypes = {
  filter: PropTypes.shape({
    dateFrom: PropTypes.string.isRequired,                // Startdatum
    dateTo: PropTypes.string.isRequired,                  // Enddatum
    categories: PropTypes.arrayOf(PropTypes.string).isRequired, // Liste der gewählten Kategorien
  }).isRequired,
  setFilter: PropTypes.func.isRequired,                   // Funktion zum Setzen des Filters
};
