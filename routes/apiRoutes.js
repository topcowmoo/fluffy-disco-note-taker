const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const dbPath = path.resolve(__dirname, "../db/db.json");

// Function to read the database file and return parsed JSON data
function readDatabase() {
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database:", err);
    return [];
  }
}

// Function to write data to the database file
function writeDatabase(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 4), "utf8");
  } catch (err) {
    console.error("Error writing to database:", err);
  }
}

// GET endpoint to retrieve all notes from the database
router.get("/api/notes", (req, res) => {
  try {
    const database = readDatabase();
    res.json(database);
  } catch (err) {
    console.error("Error getting notes:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST endpoint to create a new note
router.post("/api/notes", (req, res) => {
  try {
    const newNote = req.body;
    newNote.id = uuid.v4();
    const database = readDatabase();
    database.push(newNote);
    writeDatabase(database);
    res.json(newNote);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE endpoint to delete a note by ID
router.delete("/api/notes/:id", (req, res) => {
  try {
    const noteId = req.params.id;
    let database = readDatabase();
    const index = database.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      database.splice(index, 1);
      writeDatabase(database);
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
