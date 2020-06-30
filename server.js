const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
const connection = mongoose.connection;
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/news-articles";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./views"));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
  console.log("connected to db instance");
});

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

const htmlRoutes = require("./routes/htmlRoutes");
app.use("/", htmlRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`listening at: http://localhost:${PORT}`);
});
