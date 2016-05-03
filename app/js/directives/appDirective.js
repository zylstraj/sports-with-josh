'use strict';

module.exports = function(app) {

  app.directive('header', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/views/header.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        note: '='
      },
      transclude: true
    };
  });

  app.directive('blogListDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/views/list.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        note: '='
      },
      transclude: true
    };
  });
};
