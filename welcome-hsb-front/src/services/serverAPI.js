const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3001; // Port für dein Backend

app.use(cors()); // erlaubt Zugriff vom Frontend

// Verbindung zur MySQL-Datenbank
const connection = mysql.createConnection({
  host: "localhost",     // Hostname der Datenbank
  user: "root",          // Benutzername
  password: "root",          //  Passwort
  database: "welcome@hsb", // Name der Datenbank
});

// Route für alle Events
app.get("/api/events", (req, res) => {
  connection.query("SELECT * FROM veranstaltung", (err, results) => {
    if (err) {
      console.error("Fehler beim Abrufen:", err);
      res.status(500).send("Serverfehler");
    } else {
      res.json(results);
    }
  });
});

// Server starten
app.listen(port, () => {
  console.log(`API läuft unter http://localhost:${port}/api/events`);
});
