const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
  db.Articles.find(
    axios.get("https://www.nytimes.com/section/world").then(urlResponse => {
      let $ = cheerio.load(urlResponse.data);

      $("div.css-1l4spti").each((i, element) => {
        let result = {};
        result.imgLink = $(element)
          .find("figure")
          .attr("itemid");
        result.articleHeadline = $(element)
          .find("h2")
          .text();
        result.articleLink = $(element)
          .find("a")
          .attr("href");
      });
    })
  ).then(result => {
    console.log(result);
    // res.send(allArticles);
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
