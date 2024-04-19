const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Confession = require("../models/confession.js");
const highScoreSchema = require("../models/post.js");
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "html", "index.html"));
});

app.get("/saurav", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "html", "saurav.html"));
});

app.get("/sabal", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "html", "sabal.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "html", "game.html"));
});

app.get("/nav", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "html", "html", "nav.html"));
});

app.get("/static/deleted", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "error", "deleted.html"));
});

app.get("/static/tos", (req, res) => {
  res.render("tos");
});

app.get("/static/err400", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "error", "error400.html"));
});

app.get("/static/err401", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "error", "toomanyrequest.html"));
});

app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://soilbhai:saurav@soil.zvhk0qg.mongodb.net/?retryWrites=true&w=majority&appName=soil",
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//
app.get("/deleteconfession", (req, res) => {
  Confession.find().then((confessions) => {
    res.render("delete", { confessions: confessions });
  });
});

app.get("/feed", (req, res) => {
  function formatTimeDifference(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffDay > 0) {
      return `${diffDay} days ago`;
    } else if (diffHr > 0) {
      return `${diffHr} hours ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minutes ago`;
    } else {
      return `just now`;
    }
  }
  Confession.find().then((confessions) => {
    res.render("feed", {
      confessions: confessions,
      formatTimeDifference: formatTimeDifference,
    });
  });
});
app.get("/panel/cred123456/admin", (req, res) => {
  Confession.find()
    .then((confessions) => {
      res.render("admin", { confessions: confessions });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching confessions" });
    });
});

app.get("/panel/cred123456/backup", (req, res) => {
  ConfessionBackup.find()
    .then((confessions) => {
      res.render("backup", { confessions: confessions });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching confessions" });
    });
});

module.exports = app;
