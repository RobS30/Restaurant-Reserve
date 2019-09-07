const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var tables = [];
var waitList = [];

// Routes
// =============================================================

// goto home page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// goto tables page
app.get("/api/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/viewtables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitList);
});

// goto reserve page
app.get("/api/reserve", function(req, res) {
  console.log("here");
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Create New Reservation - takes in JSON input
app.post("/api/reserve", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  if (tables.length === 5) {
    waitList.push(newReservation);
    res.json({ error: "Sorry! No tables available! Added to waiting list." });
    return;
  }

  tables.push(newReservation);

  res.json(newReservation);
});

app.listen(PORT, function() {
  console.log("listening on port", PORT);
});
