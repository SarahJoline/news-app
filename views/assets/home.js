$("#scrapeBtn").on("click", function() {
  $.ajax({
    type: "GET",
    url: "/api"
  }).then(results => {
    console.log(results);
  });
});

// <div class="card" style="width: 18rem;">
//   <img src="..." class="card-img-top" alt="...">
//   <div class="card-body">
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div>
