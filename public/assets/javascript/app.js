// Variables to keep track of number of articles in db every time a new scrape completes
var previous = 0;
var current = null;

// Click event to scrape new articles
$('.scrape-new').on('click', function(event) {
  // Get request for articles already in db
  $.ajax({
    method: 'GET',
    url: '/articles',
  })
    .then(function (data) {
      console.log(data);
      // Set current to data.length to show current number of articles in db
      current = data.length;
      console.log(current);
      console.log(previous);
      // Sets previous variable to match current
      previous = current;
      // Get request to scrape new articles (if any)
      $.ajax({
        method: 'GET',
        url: '/scrape'
      })
        .then(function (data) {
          // Get request to get updated number of articles in db
          $.ajax({
            method: 'GET',
            url: '/articles'
          })
            .then(function (data) {
              // Updates current articles
              current = data.length;
              console.log(current);
              console.log(previous);
              // If previous and current do not equal, new articles were found
              if (previous !== current) {
                // Set previous to the current number of articles
                previous = current;
                console.log(previous);
              }
              // Otherwise, lets user know there are no new articles to scrape
              else {
                console.log('No new articles were found')
                alert('No new articles found!');
              }
              location.reload();
            })
        })
    });
});

// Click event to save article
$('.save').on('click', function() {
  var thisId = $(this).attr('data-id');
  $.ajax({
    method: 'POST',
    url: '/articles/save/' + thisId
  }).done(function (data) {
    // Takes user back to home page
    window.location.assign('/');
  })
});

// Click event to delete article 
$('.delete').on('click', function() {
  var thisId = $(this).attr('data-id');
  $.ajax({
    method: 'POST',
    url: '/articles/delete/' + thisId
  }).done(function (data) {
    // Takes user back to saved page
    window.location = '/saved'
  })
});

// Click event to save note
$('.saveNote').on('click', function() {
  var thisId = $(this).attr('data-id');
  if (!$('#noteText' + thisId).val()) {
    alert('Please enter a note to save')
  } else {
    $.ajax({
      method: 'POST',
      url: '/notes/save/' + thisId,
      data: {
        text: $('#noteText' + thisId).val()
      }
    }).done(function (data) {
      console.log(data);
      // Empties the notes section
      $('#noteText' + thisId).val('');
      $('.modalNote').modal('hide');
      // Takes user back to saved page
      window.location = '/saved'
    });
  }
});

// Click even to delete note
$('.deleteNote').on('click', function () {
  var noteId = $(this).attr('data-note-id');
  var articleId = $(this).attr('data-article-id');
  $.ajax({
    method: 'DELETE',
    url: '/notes/delete/' + noteId + '/' + articleId
  }).done(function (data) {
    console.log(data)
    $('.modalNote').modal('hide');
    // Takes user back to saved page
    window.location = '/saved'
  })
});