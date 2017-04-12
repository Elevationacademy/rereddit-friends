 var app = angular.module('rereddit', ['ui.router', 'ui.bootstrap']);

 app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

   $locationProvider.html5Mode(true);

   //if a user is already logged in then just send them home
   var checkAuth = function($state, auth) {
     if (auth.loadToken()) {
       $state.go('home');
     }
   }

   $stateProvider
     .state('home', {
       url: '/home',
       templateUrl: '/templates/home.html',
       controller: 'PostController',
       resolve: {
         posts: function($http, $state) {
           return $http.get('/posts')
             .catch(function() {
               $state.go('login');
             })
         }
       }
     })
     .state('comment', {
       url: '/post/:id',
       templateUrl: '/templates/comments.html',
       controller: 'CommentController',
       resolve: {
         post: function($http, $stateParams, $state) {
           return $http.get('/posts/' + $stateParams.id)
             .catch(function(err) {
               if (err.data.message == "No post exists") {
                 $state.go('home');
               } else {
                 $state.go('login');
               }
             })
         }
       }
     })
     .state('users', {
       url: '/user',
       templateUrl: '/templates/users.html',
       controller: 'UsersCtrl',
       resolve: {
         users: function($http, $state) {
           return $http.get('/users')
             .catch(function() {
               $state.go('login');
             })
         }
       }
     })
     .state('admin', {
       url: '/admin',
       templateUrl: '/templates/admin.html',
       controller: 'UsersCtrl',
       resolve: {
         users: function($http, $state) {
           return $http.get('/users')
             .catch(function() {
               $state.go('login');
             })
         }
       }
     })
     .state('user', {
       url: '/user/:id',
       templateUrl: '/templates/user.html',
       controller: 'UserCtrl',
       resolve: {
         user: function($http, $stateParams, $state) {
           return $http.get('/users/' + $stateParams.id)
             .catch(function(err) {
               if (err.data.message == "Can't find user") {
                 $state.go('users');
               } else {
                 $state.go('login');
               }
             })
         }
       }
     })
     .state('login', {
       url: '/login',
       templateUrl: '/templates/login.html',
       controller: 'AuthController',
       onEnter: checkAuth
     })
     .state('register', {
       url: '/register',
       templateUrl: '/templates/register.html',
       controller: 'AuthController',
       onEnter: checkAuth
     });


   $urlRouterProvider.otherwise('home');
 });

 app.run(function(auth) {
   auth.loadToken()
 })
