app.controller('AuthController', function($scope, $state, auth) {

  var success = function() {
    $state.go('home');
  }

  var error = function(err) {
    alert(err.data.message ? err.data.message : err.data)
  }

  $scope.register = function() {
    auth.register($scope.user)
      .then(success)
      .catch(error);
  };

  $scope.logIn = function() {
    auth.logIn($scope.user)
      .then(success)
      .catch(error);
  };
})
