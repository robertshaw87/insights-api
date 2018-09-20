const express = require("express");

// Use port 3000 for development
const PORT = process.env.PORT || 3000;

const app = express();

// Import API routes from controller
const routes = require("./controllers/insight_controller.js");
app.use(routes);

// Set the server to start listening on our PORT
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
