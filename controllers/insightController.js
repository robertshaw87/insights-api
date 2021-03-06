const express = require("express");
const router = express.Router();

// Import utility functions
const utils = require("../utility");
// Import post data
const post = require("../model/post.js");

// The "/api/posts" Route returns the full data of each post
router.get("/posts", (req, res) => {
  const {key, ...options} = req.query;
  // Check if the provided API key is valid
  if (utils.checkKey(key)) {
    const data = post.getAll(options);
    res.status(200);
    res.json(data);
  } else {
    // Respond with an error if invalid error code
    res.status(401);
    res.send("The provided key does not match our records.")
  }
})

// The "/api/posts/aggregate" route returns statistical aggregations for the relevance and sentiment scores
router.get("/posts/aggregate", (req, res) => {
  const {key, ...options} = req.query;
  // Check if the provided API key is valid
  if (utils.checkKey(key)) {
    const data = post.getAggregate(options);
    res.status(200);
    res.json(data);
  } else {
    // Respond with an error if invalid error code
    res.status(401);
    res.send("The provided key does not match our records.")
  }
})

module.exports = router
