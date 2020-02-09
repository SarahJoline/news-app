const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  photo: {
    type: String,
    required: "Must pass a string value for photo"
  },

  headline: {
    type: String,
    required: "Must pass a string value for headline"
  },

  link: {
    type: String,
    required: "Must pass a tring value for link"
  },

  comments: {
    type: [Schema.Types.String],
    default: []
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
