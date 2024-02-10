// Import dependancies
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// function to initialize express
const app = express();

// PORT variable to determine which port express will listen on
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Server listener method
app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
