const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const router = express.Router();

router.get("/all", (req, res) => {
  axios.get("https://www.enn.com").then((urlResponse) => {
    let $ = cheerio.load(urlResponse.data);

    $("div.col-md-6").each((i, element) => {
      let result = {};

      result.photo = $(element).find("img").attr("src");
      result.summary = $(element).find("p").text();
      result.headline = $(element).find("h3").find("a").text();
      result.link = $(element).find("a").attr("href");

      let newArt = new db.Articles(result);

      db.Articles.find({
        headline: result.headline,
      }).then((res) => {
        if (res.length > 0) {
          console.log("up to date");
        } else {
          newArt.save((err, doc) => {
            if (err) {
              console.log(err);
            } else {
              res.json(doc);
            }
          });
        }
      });
    });
    res.send("scraped");
  });
});

router.get("/articles", (req, res) => {
  db.Articles.find((error, doc) => {
    if (error) {
      console.log(error);
    } else {
      res.json(doc);
    }
  });
});

router.get("/saved", (req, res) => {
  db.Articles.find({ saved: true }, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      res.json(doc);
    }
  });
});

router.post("/save/:id", (req, res) => {
  db.Articles.findOneAndUpdate({ _id: req.params.id }, { saved: true })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

router.post("/comment/:id", (req, res) => {
  const newNote = new db.Notes({
    body: req.body.text,
    article: req.params.id,
  });

  console.log(newNote);

  newNote.save((error, note) => {
    if (error) {
      console.log(error);
    } else {
      db.Articles.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: note } }
      )
        .then(() => {
          res.send(articles, notes);
        })
        .catch((err) => res.send(err));
    }
  });
});

router.get("/comment/all/:articleId", (req, res) => {
  db.Notes.find({ article: req.params.articleId })
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/deleteSaved/:id", (req, res) => {
  db.Articles.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      saved: false,
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
});

module.exports = router;
