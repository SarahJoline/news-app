const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
  db.Articles.find().then(allArticles => {
    res.send(allArticles);
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
