const express = require("express");

// Use port 3000 for development
const PORT = process.env.PORT || 3000;

const app = express();

// Import API routes from controller
const API_ROUTES = require("./controllers/insightController.js");
app.use("/api", API_ROUTES);

// Set the server to start listening on our PORT
app.listen(PORT, function(){console.log(`Server listening on ${PORT}`)});
