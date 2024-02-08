// Import dependancies
const express = require('express');

// Function to initialize express
const app = express();

// PORT variable to determine which port express will listen on
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/api-routes/apiRoutes");
app.use(apiRoutes);
const htmlRoutes = require("./routes/html-routes/htmlRoutes")
app.use(htmlRoutes);

// Server listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));