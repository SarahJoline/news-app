const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NotesSchema = new Schema({
  body: {
    type: String,
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
  },
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
