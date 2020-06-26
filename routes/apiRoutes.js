const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const router = express.Router();

router.get("/all", (req, res) => {
  axios.get("https://www.nytimes.com/section/world").then((urlResponse) => {
    let $ = cheerio.load(urlResponse.data);

    $("div.css-1l4spti").each((i, element) => {
      let result = {};
      result.photo = $(element).find("figure").attr("itemid");
      result.headline = $(element).find("h2").text();
      result.link = $(element).find("a").attr("href");

      let newArt = new db.Articles(result);

      db.Articles.find({
        headline: result.headline,
      }).then((res) => {
        if (res.length > 0) {
          console.log(newArt);
        } else {
          newArt.save((err, doc) => {
            if (err) {
              console.log(err);
            } else {
              console.log(doc);
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

router.post("/comment", (req, res) => {
  db.Articles.findByIdAndUpdate(
    { _id: req.query.id },
    { $push: { comments: req.query.comment } }
  )
    .then(() => {
      res.send("success");
    })
    .catch((err) => res.send(err));
});
router.delete("/delete/:id", (req, res) => {
  db.Articles.deleteOne({ _id: req.params.id }).then(() => {
    res.send("success");
  });
});
module.exports = router;
