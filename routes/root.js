const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("^/new-page$|/new-page(.html)?", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page.html", (req, res, next) => {
  /* res.redirect('/new-page') */
  res.redirect(301, "/new-page");
});

module.exports = router;
