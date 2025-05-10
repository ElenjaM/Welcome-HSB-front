/**
 * Holt Events von einem lokalen API-Server, z. B. von http://localhost:3001/api/events
 */
export async function fetchEvents(filter) {
  try {
    // Hole alle Events von der API
    // Hier wird die URL der API angegeben. Diese sollte mit dem Backend übereinstimmen.
    const response = await fetch("http://localhost:3001/api/events");
    // Überprüfe, ob die Antwort erfolgreich war
    // Wenn nicht, wird ein Fehler geworfen
    if (!response.ok) {
      throw new Error("Netzwerkantwort war nicht ok");
    }
    // Konvertiere die Antwort in JSON
    const allEvents = await response.json();

    // Clientseitige Filterung nach Datum & Kategorien
    return allEvents.filter((event) => {
      const eventDate = new Date(event.Datum); 
      const matchesCategory =
        filter.categories.length === 0 || filter.categories.includes(event.Topic);
      const matchesDate =
        eventDate >= new Date(filter.dateFrom) &&
        eventDate <= new Date(filter.dateTo);

      return matchesCategory && matchesDate;
    });
  } catch (error) {
    console.error("Fehler beim Laden der Events von der API:", error);
    return [];
  }
}
