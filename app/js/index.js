'use strict';

require('angular/angular');
require('angular-route');

var app = angular.module('app', ['ngRoute']); // eslint-disable-line

require('./controllers/appController')(app);

// require('./directives/appDirective')(app);

require('./services/auth')(app);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/articles', {
      templateUrl: 'views/list.html',
      controller: 'AppCtrl'
    })
    .when('/blogs/:_id', {
      templateUrl: 'views/singlepost.html',
      controller: 'AppCtrl'
    })
    .when('/newuser', {
      templateUrl: 'views/newuser.html',
      controller: 'AppCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AppCtrl'
    })
    .when('/post', {
      templateUrl: 'views/post.html',
      controller: 'AppCtrl'
    })
    .when('/imageupload', {
      templateUrl: 'views/imageupload.html',
      controller: 'AppCtrl'
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AppCtrl'
    })
    .when('/', {
      templateUrl: 'views/list.html',
      controller: 'AppCtrl'
    });
}]);
