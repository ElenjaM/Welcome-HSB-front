// services/eventApiService.js

/**
 * Holt Events von der HSB-API unter Verwendung von Filtern.
 * @param {Object} filter
 * @returns {Promise<Array>} Gefilterte Events
 */
export async function fetchEvents(filter) {
    // Anfrage-Payload wie von der HSB-API erwartet
    const payload = {
      form: {
        pluginNamespace: "search",
        additionalFilters: filter.categories.map((category) => ({
          name: "topic",
          value: category,
        })),
        query: null,
        pageUid: null,
        languageUid: null,
      },
    };
  
    try {
      const response = await fetch("https://www.hs-bremen.de/api/v1/search/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      // Extrahiere die Ergebnisse aus der verschachtelten Struktur
      return data.content.colPos0[0].content.data.documents.list.results;
    } catch (err) {
      console.error("API Fehler:", err);
      return []; // Im Fehlerfall: leere Liste zurückgeben
    }
  }
  