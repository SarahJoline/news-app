const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://www.nytimes.com/section/world").then(urlResponse => {
  let $ = cheerio.load(urlResponse.data);

  $("div.css-1l4spti").each((i, element) => {
    const articleLink = $(element)
      .find("a")
      .attr("href");

    console.log(articleLink);
  });
});
