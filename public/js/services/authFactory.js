app.factory('auth', function($rootScope, $http, $window) {
  var auth = {};

  var loaded = false;

  var _saveToken = function(response) {
    $rootScope.userid = response.data.userid;
    $rootScope.username = response.data.username;
    $rootScope.isAdmin = response.data.isAdmin;
    $window.localStorage['rereddit-jwt'] = response.data.token;
    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
  };

  auth.register = function(user) {
    return $http.post('/auth/register', user)
      .then(_saveToken)
  };

  auth.logIn = function(user) {
    return $http.post('/auth/login', user)
      .then(_saveToken)
  };

  auth.logOut = function() {
    $window.localStorage.removeItem('rereddit-jwt');
    $rootScope.username = null;
    $rootScope.userid = null;
    $rootScope.isAdmin = null;
    loaded = false;
    delete $http.defaults.headers.common.Authorization
  };

  auth.loadToken = function() {
    var token = $window.localStorage['rereddit-jwt'];
    if (!loaded && token && token != "undefined") {
      loaded = true
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      if (payload.exp > Date.now() / 1000) {
        $rootScope.userid = payload.userid;
        $rootScope.username = payload.username;
        $rootScope.isAdmin = payload.isAdmin;
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        return true
      }
      auth.logOut()
    } else if (loaded) {
      return true
    }
    return false

  };
  return auth;
});
