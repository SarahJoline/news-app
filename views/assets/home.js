$(document).ready(function () {
  $("#scrapeBtn").on("click", function () {
    $.ajax({
      type: "GET",
      url: "/api/all",
    }).then((results) => {
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        $("#article-div").append(
          "<div class='result-div'><img src=" +
            results[i].photo +
            " alt='Image Not Available'></img><p class='result-headline'>" +
            results[i].headline +
            "</p><a href='https://www.nytimes.com" +
            results[i].link +
            "'>Link to Article</a><button id='save-Btn' class='save-article button is-info is-medium' dataid='" +
            results[i]._id +
            "'>Save Article</button></div>"
        );
      }

      $("#save-Btn").on("click", function () {
        console.log(this.dataid);
      });
    });
  });
});
