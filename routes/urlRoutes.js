const express = require("express");
const router = express.Router();

// example route
router.get("/", (req, res) => {
  res.send("URL route working");
});

module.exports = router;