$(document).ready(function() {
  var urlSearch = window.location.search;
  var numberPage = null;

  if (urlSearch) {
    numberPage = Number(/[1-9]$/.exec(urlSearch));
  }

  $('#js-next-page').click(function(event) {
    numberPage = numberPage + 1;
    document.location.search = '?page=' + numberPage;
  });

  $('#js-back-page').click(function(event) {
    numberPage = numberPage - 1;
    document.location.search = '?page=' + numberPage;
  });

  var queryUrl = "https://reqres.in/api/users?page=" + numberPage;

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).done(function(response) {
    var pageInformation = "";
    pageBuilder(response, pageInformation);

    if (numberPage >= response.total_pages) {
      $('#js-next-page').hide();
    }

    if (numberPage <= 1) {
      $('#js-back-page').hide();
    }
  })
});

function pageBuilder(response, pageInformation) {
  for (var i = 0; i < response.data.length; i++) {
    pageInformation += '<div class="page-information">';
    pageInformation += '<div><img src="' + response.data[i].avatar + '"></div>';
    pageInformation += '<div>';
    pageInformation += '<p class="email-user">' + response.data[i].email + '</p>';
    pageInformation += '<p class="id-user">ID: ' + response.data[i].id + '</p>';
    pageInformation += '<p class="name-user">' + response.data[i].first_name + ' ' + response.data[i].last_name + '</p>';
    pageInformation += '</div>';
    pageInformation += '</div>';

    $('#js-page-information').html(pageInformation);
    $('#js-actual-page').html(response.page);
    $('#js-total-pages').html(response.total_pages);
  }
}
