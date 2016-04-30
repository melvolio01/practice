$(init);

function init() {
  $("form").on("submit", submitForm);
  getUsers();
}

function submitForm() {
  event.preventDefault();

  var method = $(this).attr("method");
  var url    = $(this).attr("action");
  var data   = new FormData(this); // $(this).serialize();

  // clear the form
  this.reset();

  return ajaxRequest(method, url, data, getUsers);
}

function getUsers(){
  // get the user data from the API and call displayUsers
  event.preventDefault();
  return ajaxRequest("get", "/api/users", null, displayUsers);
}

function displayUsers(data){
  // take the user data and display all the users as <li>s in the <ul>, eg:
  // <li class="list-group-item">mickyginger (mike.hayden@ga.co)</li>
  var $users = $('ul.users');
  $users.empty();
  data.users.forEach(function(user) {
    $users.append('<li class="col-sm-6 col-md-4">'+
      '<div class="thumbnail">'+
        '<img src="'+user.avatar +'">' +
        '<div class="caption">' +
          '<h3>'+user.username+'</h3>' +
          '<p>'+user.email+'</p>' +
        '</div>' +
      '</div>' +
    '</li>');
  });
}

function setToken(token) {
  // set the token into localStorage
  return localStorage.setItem('token', token);
}

function getToken() {
  // get the token from localStorage
  return localStorage.getItem('token');
}

function removeToken() {
  // remove the token from localStorage
  return localStorage.clear();
}

function ajaxRequest(method, url, data, callback) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    contentType: false, // allow ajax to send file data
    processData: false, // allow ajax to send file data
    beforeSend: function(jqXHR) {
      var token = getToken();
      if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
    }
  }).done(function(data){
    if (callback) return callback(data);
  }).fail(function(data) {
    console.error(data.responseJSON);
  });
}