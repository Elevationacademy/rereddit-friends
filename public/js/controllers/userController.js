app.controller('UserCtrl', function($scope, auth, user, userFactory) {
  $scope.user = user.data;
  $scope.isCurrentUser = userFactory.isCurrentUser;
});
