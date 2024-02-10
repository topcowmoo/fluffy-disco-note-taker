const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(__dirname, "../db/db.json");

function readDatabase() {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

function writeDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 4), "utf8");
}

router.get("/", (req, res) => {
  const database = readDatabase();
  res.json(database);
});

router.post("/", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  const database = readDatabase();
  database.push(newNote);
  writeDatabase(database);
  res.json(newNote);
});

router.delete("/:id", (req, res) => {
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
});

module.exports = router;
