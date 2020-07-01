const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connection = mongoose.connection;
const PORT = process.env.PORT || 8000;
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/news-articles";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

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
