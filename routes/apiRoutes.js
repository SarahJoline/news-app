const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const router = express.Router();

router.get("/all", (req, res) => {
  axios.get("https://www.nytimes.com/section/world").then(urlResponse => {
    let $ = cheerio.load(urlResponse.data);
    let articles = [];
    $("div.css-1l4spti").each((i, element) => {
      let result = {};
      result.photo = $(element)
        .find("figure")
        .attr("itemid");
      result.headline = $(element)
        .find("h2")
        .text();
      result.link = $(element)
        .find("a")
        .attr("href");

      articles.push(result);

      console.log(result);

      db.Articles.create(articles)
        .then(function(data) {
          console.log(data);
        })
        .catch(function(err) {
          console.log("There was an error in your request", err);
        });
    });
    res.send(articles);
  });
});

router.post("/save", (req, res) => {
  db.Articles.create(req.body)
    .then(savedArticle => {
      res.send(savedArticle);
    })
    .catch(err => res.send(err));
});
router.post("/comment", (req, res) => {
  db.Articles.findByIdAndUpdate(
    { _id: req.query.id },
    { $push: { comments: req.query.comment } }
  )
    .then(() => {
      res.send("success");
    })
    .catch(err => res.send(err));
});
router.delete("/delete/:id", (req, res) => {
  db.Articles.deleteOne({ _id: req.params.id }).then(() => {
    res.send("success");
  });
});
module.exports = router;
