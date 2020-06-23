const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const connection = mongoose.connection;
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/deploy_todoDB";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
