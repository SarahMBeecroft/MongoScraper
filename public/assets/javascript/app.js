// $( document ).ready(function() {

// // Scrape event handler
// $('.scrape-new').on('click', function() {
//   $.ajax({
//     method: 'GET',
//     url: '/scrape',
// }).done(function(data) {
//     console.log(data)
//     window.location = '/'
// })
// });

// // Save article event handler
// $('.save').on('click', function() {
//   var thisId = $(this).attr('data-id');
//   $.ajax({
//       method: 'POST',
//       url: '/articles/save/' + thisId
//   }).then(function(data) {
//       window.location = '/'
//   });
// });

// });