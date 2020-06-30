$(document).ready(function () {
  $("#scrapeBtn").on("click", function () {
    $.ajax({
      type: "GET",
      url: "/api/articles",
    }).then((results) => {
      for (var i = 0; i < 16; i++) {
        $("#article-div").append(
          "<div class='result-div' style='background-image: url(" +
            results[i].photo +
            ")'><div class='result-info'><h5 class='result-headline'>" +
            results[i].headline +
            "</h5><br><p class='result-summary'>" +
            results[i].summary +
            "</p><a href='https://www.enn.com" +
            results[i].link +
            "' class='result-anchor'>Link to Article</a><br><button id='save-Btn' class='save-article button is-info is-medium' dataId=" +
            results[i]._id +
            ">Save Article</button></div>"
        );
      }
    });
  });

  $(document).on("click", "#save-Btn", (e) => {
    e.preventDefault();

    const id = $(e.target).attr("dataId");

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
        "<div class='result-div' style='background-image: url(" +
          results[i].photo +
          ")'><div class='result-info'><h5 class='result-headline'>" +
          results[i].headline +
          "</h5><br><p class='result-summary'>" +
          results[i].summary +
          "</p><a href='https://www.enn.com" +
          results[i].link +
          "' class='result-anchor'>Link to Article</a><br><button id='remove-Btn' class='remove-article button is-info is-medium' dataId=" +
          results[i]._id +
          ">remove</button> | <button id='comment-Btn' class='comment-article button is-info is-medium' data-toggle='modal' data-target='#note-modal' dataId=" +
          results[i]._id +
          ">notes</button></div></div>"
      );
    }
  });

  $(document).on("click", "#comment-Btn", (e) => {
    e.preventDefault();

    const articleId = $(e.target).attr("dataId");

    $("#notes-div").append(`
    <div class="modal fade" id="note-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">add a note:</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <ol class="list-group note-container" id="note-container">
        </ol>
        <textarea placeholder="Add a note"></textarea
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button class="btn btn-primary saveNotes"  data-dismiss="modal" dataId=${articleId} id="save-note">save</button>
        </div>
      </div>
    </div>
  </div>`);

    $.ajax({
      method: "GET",
      url: "api/comment/all/" + articleId,
    }).then((res) => {
      res.map((notes) => {
        console.log(notes);

        $("#note-container").append(
          `<li class="list-group-item note">${notes.body}</li>`
        );
      });
    });
  });

  $(document).on("click", "#save-note", (e) => {
    e.preventDefault();
    let text = $("textarea").val();
    const id = $(e.target).attr("dataId");
    console.log(id);

    $.ajax({
      method: "POST",
      url: "api/comment/" + id,
      data: { text },
    }).then((res) => {
      console.log(res);
    });
    window.location = "/saved-articles";
  });

  $(document).on("click", "#remove-Btn", (e) => {
    e.preventDefault();

    const id = $(e.target).attr("dataId");
    console.log(id);
    $.ajax({
      method: "POST",
      url: "/api/deleteSaved/" + id,
    }).done((data) => {
      console.log(data);
    });
    window.location = "/saved-articles";
  });
});
