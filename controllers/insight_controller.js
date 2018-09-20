const express = require('express')
const router = express.Router()

router.get("/posts", function (req, res) {
  res.json(req.query)
})

module.exports = router
