$(document).ready(function () {
  $("#scrapeBtn").on("click", function () {
    $.ajax({
      type: "GET",
      url: "/api/articles",
    }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        $("#article-div").append(
          "<div class='result-div'><img src=" +
            results[i].photo +
            " alt='Image Not Available'></img><p class='result-headline'>" +
            results[i].headline +
            "</p><a href='https://www.nytimes.com" +
            results[i].link +
            "'>Link to Article</a><button id='save-Btn' class='save-article button is-info is-medium' dataId=" +
            results[i]._id +
            ">Save Article</button></div>"
        );
      }
    });
  });

  $(document).on("click", "#save-Btn", (e) => {
    e.preventDefault();

    const id = $(e.target).attr("dataId");

    console.log(id);
    console.log("How is this popping up: ");

    $.ajax({
      method: "POST",
      url: "/api/save/" + id,
    }).then((data) => {
      console.log(data);
    });
  });

  $.ajax({
    type: "GET",
    url: "/api/saved",
  }).then((results) => {
    for (var i = 0; i < results.length; i++) {
      $("#savedArtDiv").append(
        "<div class='result-div'><img src=" +
          results[i].photo +
          " alt='Image Not Available'></img><p class='result-headline'>" +
          results[i].headline +
          "</p><a href='https://www.nytimes.com" +
          results[i].link +
          "'>Link to Article</a><button id='remove-Btn' class='remove-article button is-info is-medium' dataId=" +
          results[i]._id +
          ">remove</button></div>"
      );
    }
  });
});
