// Import modules
const express = require("express");
const router = express.Router();
const path = require("path");

// Route for serving the notes.html file
router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Route for handling wildcard routes
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Export router module
module.exports = router;
