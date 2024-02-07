const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connection = mongoose.connection;
const PORT = process.env.PORT || 8000;

dotenv.config();
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/news-articles";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
  console.log("connected to db instance");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./views"));

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

const htmlRoutes = require("./routes/htmlRoutes");
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`listening at: http://localhost:${PORT}`);
});
