// services/eventService.js

// Lokale Eventdaten aus einer JSON-Datei importieren
import localEvents from "../data/events.json";

/**
 * Diese Funktion filtert lokale Veranstaltungen anhand eines Filterobjekts.
 * Sie simuliert den Abruf von Events über eine API.
 *
 * @param {Object} filter - Das Filterobjekt mit:
 *   - categories: Array von ausgewählten Kategorien (Topics)
 *   - dateFrom: Startdatum im Format YYYY-MM-DD
 *   - dateTo: Enddatum im Format YYYY-MM-DD
 * @returns {Promise<Array>} Gefilterte Events
 */
export async function fetchEvents(filter) {
  return new Promise((resolve) => {
    // Filterlogik: durchlaufe alle lokalen Events
    const result = localEvents.filter((event) => {
      const eventDate = new Date(event.startdate); // Datum der Veranstaltung

      // Kategorievergleich:
      // Wenn keine Kategorien ausgewählt wurden, akzeptiere alle Events.
      // Andernfalls prüfe, ob das Event-Topic in den gewählten Kategorien enthalten ist.
      const matchesCategory =
        filter.categories.length === 0 ||
        filter.categories.includes(event.topic);

      // Datumsvergleich:
      // Das Event muss zwischen dateFrom und dateTo liegen.
      const matchesDate =
        eventDate >= new Date(filter.dateFrom) &&
        eventDate <= new Date(filter.dateTo);

      // Event wird nur zurückgegeben, wenn beide Bedingungen erfüllt sind
      return matchesCategory && matchesDate;
    });

    // Rückgabe der gefilterten Ergebnisse über das Promise
    resolve(result);
  });
}
