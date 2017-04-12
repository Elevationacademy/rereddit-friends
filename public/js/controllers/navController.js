app.controller('NavCtrl', function($state, $scope, auth) {
  $scope.logOut = function() {
    auth.logOut()
    $state.go('login');
  }
});
