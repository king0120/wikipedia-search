$(document).ready(function() {
  var searchTerm = '';
  $('.searchbox').keyup(function(event) {
    setTimeout(function() {

      var results = [];
      $('.snippet').html('');
      searchTerm = $('#name').val();
      var $html = '';
      $.ajax({
        method: "GET",
        dataType: 'jsonp',
        url: 'http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + searchTerm,
        success: function(data) {
          var $searchResult = data.query.search;
          for (i = 0; i < $searchResult.length; i++) {
            var $searchTitle = $searchResult[i].title;
            $.ajax({
              method: "GET",
              dataType: 'jsonp',
              url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&exsentences=3&titles=' + $searchTitle,
              success: function(data1) {
                var $pages = data1.query.pages;
                var $extract = '';
                var $searchTitle = '';

                for (var i in $pages) {
                  var searchObject = new Object();
                  searchObject.title = $pages[i].title;
                  searchObject.description = $pages[i].extract;

                };
                results.push(searchObject);
                console.log(results);
                var $html = "";
                results.forEach(function(a) {

                  $html += "<div class='wikiEntry'>";
                  $html += "<a target='_blank' href='https://en.wikipedia.org/wiki/" + a.title + "'>";
                  $html += "<div class='title'>" + a.title + "</div>";
                  $html += "<hr class='style-seven'> </hr>";
                  $html += "<div class='description'>" + a.description + "</div>";
                  $html += "</a>";
                  $html += "</div>";

                  $('.snippet').html($html);
                });
                $('.wikiEntry').fadeIn(700);
                console.log($html);
                //  $('p').html($html);
              }

            });
          }

        }

      });
    }, 400);
  });

  $('.slideRight').click(function() {
    $('.clickSearch').css('background-color', 'none');

    setTimeout(function() {
      $('.searchbox').fadeIn('slow');
      $('.title1').fadeOut('slow');
      $('#click').fadeOut('slow');
    }, 2000);
    setTimeout(function() {
      $('.title2').fadeIn('slow');}
 , 5000);
  });
});