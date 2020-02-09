const axios = require("axios");
const cheerio = require("cheerio");

axios.get("https://www.nytimes.com/section/world").then(urlResponse => {
  let $ = cheerio.load(urlResponse.data);

  $("div.css-1l4spti").each((i, element) => {
    const imgLink = $(element)
      .find("figure")
      .attr("itemid");
    const articleHeadline = $(element)
      .find("h2")
      .text();
    const articleLink = $(element)
      .find("a")
      .attr("href");

    console.log(imgLink);
    console.log(articleHeadline);
    console.log(articleLink);
  });
});
