import React from "react";
import { Link } from "react-router-dom"; // Für Navigation zu anderen Seiten

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      {/* Oberer schwarzer Header-Bereich */}
      <div className="h-[300px] bg-black flex items-center justify-center text-gray-500 text-xl">
        Promovideo/ Anleitung Terminal
      </div>

      {/* Weißer Hauptbereich mit spitzem Design nach oben */}
      <div
        className="relative bg-white text-black -mt-20 pt-24 px-8 pb-0 h-auto"
        style={{
          clipPath: "polygon(0 15%, 50% 0, 100% 15%, 100% 100%, 0 100%)", // spitzes Design
        }}
      >
        {/* Überschrift zentral */}
        <div className="text-center mt-6">
          <h1 className="text-2xl font-bold text-rose-700 tracking-wide">
            FINDE DEINEN WEG!
          </h1>
          <p className="text-sm mt-1">Mit dem neuen Leitsystem ... BLA BLA</p>
        </div>

        {/* Linker Bereich mit Layer-Stapel und Legende */}
        <div className="mt-16 ml-10 flex flex-col items-start gap-8 w-fit">
          {/* Simulierter 3D-Stapel */}
          <div className="flex flex-col items-center justify-center gap-[6px]">
            <div className="w-[300px] h-[40px] bg-rose-300 rounded-full shadow-md"></div>
            <div className="w-[290px] h-[40px] bg-blue-500 rounded-full shadow-md"></div>
            <div className="w-[280px] h-[40px] bg-green-400 rounded-full shadow-md"></div>
            <div className="w-[270px] h-[40px] bg-indigo-800 rounded-full shadow-md"></div>
          </div>

          {/* Legendenbereich */}
          <div className="bg-gray-100 p-6 rounded-lg w-[300px] shadow-md">
            <h2 className="font-bold text-blue-600 text-xl mb-3">LEGENDE</h2>
            <ul className="text-base space-y-2">
              <li>Gemeinschafts-/Lernräume</li>
              <li>Dichte des Verkehrs</li>
            </ul>
          </div>
        </div>

        {/* Rechter Bereich – Schwarzes Brett */}
        <div className="mt-[-240px] ml-auto mr-8 bg-neutral-900 text-white pt-24 px-10 pb-24 flex gap-10 items-start max-w-[1000px] rounded-lg">
          <div className="flex flex-col items-start gap-6">
            <h2 className="text-pink-300 text-2xl font-bold">
              DAS SCHWARZE BRETT
            </h2>

            {/* Notizkarten/Infoboxen */}
            <div className="flex flex-wrap gap-6 justify-start">
              {/* Hinweis-Notiz */}
              <div className="bg-blue-200 text-black p-3 rounded-md rotate-[-10deg] w-60">
                <strong>Nur noch bis zum 30.12.2024:</strong>
                <br />
                Bewerbungen für den Dualen Master Informatik bei AIRBUS
              </div>

              {/* Info zu Mensa */}
              <div className="bg-white text-black p-4 rounded-md w-60">
                <strong>Mensa in der Weihnachtszeit:</strong>
                <br />
                In der vorlesungsfreien Zeit schließt die Mensa am Airport.
                Alternativen gäbe es am Neustadtswall und der Universität mit
                geänderten Öffnungszeiten:
                <br />
                <span className="mt-2 font-mono bg-gray-200 inline-block px-2 py-1 rounded">
                  Mo-Fr: 12 - 14:00
                </span>
              </div>

              {/* Jobangebot */}
              <div className="bg-pink-300 text-black p-4 rounded-md w-60">
                <strong>Wissenschaftliche/-r Mitarbeiter/-in gesucht!</strong>
                <p className="text-sm mt-1">
                  Liebe Studierende, ich suche eine/-n wissenschaftliche/-n
                  Mitarbeiter/-in für die Forschung an der Supraleitung. Bei
                  Interesse, schreiben Sie mich gerne an.
                </p>
                <p className="font-semibold mt-2">Prof. Dr. Hagrid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer-Bereich mit Logo, Suche und Navigation */}
      <footer
        className="w-full bg-black text-white flex items-center justify-between px-4 md:px-8 text-sm"
        style={{ height: "5vh", minHeight: "40px" }}
      >
        {/* Linke Seite mit Logo und "Suchfeld"-Deko */}
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

        {/* Rechte Seite mit Navigation */}
        <nav className="flex gap-4 md:gap-8 text-xs md:text-sm">
          <span className="text-blue-400 font-bold">DAS TEAM</span>
          <Link to="/events" className="text-rose-400 font-bold">
            ANSTEHENDE EVENTS
          </Link>
        </nav>
      </footer>
    </div>
  );
}
