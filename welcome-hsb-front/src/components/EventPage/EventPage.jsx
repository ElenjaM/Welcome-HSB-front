// React Hooks und Komponenten importieren
import React, { useEffect, useState } from "react";
import { EventCard } from "./EventCard";              // Komponente zur Darstellung einzelner Events
import { FilterPanel } from "./FilterPanel";          // Komponente für das Filter-Menü
import { fetchEvents } from "../../services/eventService"; // Funktion zum Laden der Events (lokal oder API)
import { Link } from 'react-router-dom'; // Importiere Link für die Navigation

// Hauptkomponente für die Eventseite
export default function EventPage() {
  // Zustand für geladene Events
  const [events, setEvents] = useState([]);

  // Zustand, ob das Filterpanel sichtbar ist
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Zustand für das Suchfeld
  const [searchTerm, setSearchTerm] = useState("");

  // Zustand für die aktuelle Seite (Pagination)
  const [currentPage, setCurrentPage] = useState(0);

  // Konstante: wie viele Events pro Seite angezeigt werden sollen
  const eventsPerPage = 4;

  // Filterzustand mit Start- und Enddatum sowie gewählten Kategorien
  const [filter, setFilter] = useState({
    dateTo: "2025-12-31",                                      // Ende fest auf Jahresende
    dateFrom: new Date().toISOString().split("T")[0],          // Start = heute
    categories: [],                                            // zunächst keine Kategorie aktiv
  });

  // useEffect: wird bei Filter- oder Suchfeldänderung ausgeführt
  useEffect(() => {
    loadEvents();      // Events neu laden
    setCurrentPage(0); // Zurück zur ersten Seite springen
  }, [filter, searchTerm]);

  // Lädt Events mit aktuellem Filter
  async function loadEvents() {
    try {
      const eventData = await fetchEvents(filter);
      setEvents(eventData);
    } catch (error) {
      console.error("Fehler beim Laden der Events:", error);
    }
  }

  // Filtert Events lokal anhand Suchbegriff (in Titel oder Thema)
  const filteredEvents = events.filter((event) => {
    const title = event.title?.toLowerCase() || "";
    const topic = event.topic?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    return title.includes(term) || topic.includes(term);
  });

  // Pagination: Start-Index berechnen
  const startIndex = currentPage * eventsPerPage;

  // Events für aktuelle Seite herausschneiden
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  // Gesamtanzahl Seiten berechnen
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col">
      {/* Oberer schwarzer Bereich */}
      <header
        className="flex items-center justify-center text-gray-500 text-xl"
        style={{ height: "30vh", minHeight: "150px" }}
      >
        Bilder/Videos von Events
      </header>

      {/* Weißer Hauptbereich mit Spitze */}
      <main
        className="relative bg-white text-black -mt-[6vw] pt-[6vw] px-4 md:px-8 pb-0 flex-grow"
        style={{
          clipPath: "polygon(0 15%, 50% 0, 100% 15%, 100% 100%, 0 100%)",
        }}
      >
        {/* Filter-Button & Suchfeld nebeneinander */}
        <div className="sticky top-4 z-50 ml-4 flex items-center gap-4">
          {/* Filter-Symbol */}
          <button
            aria-label="Filter anzeigen"
            onClick={() => setFiltersVisible((prev) => !prev)}
            className={`p-2 rounded-md transition-colors ${
              filtersVisible ? "bg-green-200" : "bg-gray-100"
            }`}
          >
            <img
              src="/icons/filter.svg"
              alt="Filter Icon"
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </button>

          {/* Suchfeld */}
          <input
            type="text"
            placeholder="Suche nach Events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded-md text-sm w-60 md:w-80"
          />

          {/* Sichtbares Filterpanel */}
          {filtersVisible && (
            <div className="absolute left-0 top-full mt-2 z-40">
              <FilterPanel filter={filter} setFilter={setFilter} />
            </div>
          )}
        </div>

        {/* Event-Liste oder keine Ergebnisse */}
        <section className="mt-4 md:mt-8 flex flex-col gap-4">
          {paginatedEvents.length === 0 ? (
            <p className="text-center text-gray-500">
              Keine Veranstaltungen gefunden.
            </p>
          ) : (
            paginatedEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          )}
        </section>

        {/* Pagination-Steuerung */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-4 items-center">
            {/* Zurück-Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ◀
            </button>

            {/* Anzeige der aktuellen Seite */}
            <span className="text-sm">
              Seite {currentPage + 1} von {totalPages}
            </span>

            {/* Weiter-Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(totalPages - 1, prev + 1)
                )
              }
              disabled={currentPage >= totalPages - 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ▶
            </button>
          </div>
        )}
      </main>

      {/* Footer-Bereich mit Logo, Suche und Navigation */}
      <footer
        className="w-full bg-black text-white flex items-center justify-between px-4 md:px-8 text-sm"
        style={{ height: "5vh", minHeight: "40px" }}
      >
        {/* HSB-Logo & Pseudo-Suchfeld */}
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <span className="text-rose-500 font-bold flex items-center gap-1">
            <span className="rounded-full w-4 h-4 bg-gradient-to-r from-rose-500 to-blue-500 flex items-center justify-center text-[10px] text-white">
              ©
            </span>
            HSB
          </span>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-800 text-rose-300">
            <span className="text-sm">🔍</span>
            <div className="w-36 h-3 rounded-full bg-zinc-700" />
          </div>
        </div>

        {/* Footer-Navigation */}
        <nav className="flex gap-4 md:gap-8 text-xs md:text-sm">
          <span className="text-blue-400 font-bold">DAS TEAM</span>
          <Link to="/" className="text-rose-400 font-bold">
        STARTSEITE
      </Link>
        </nav>
      </footer>
    </div>
  );
}