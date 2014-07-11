angular.module('gmajor.directives', [])

//Directives for getting around an angular bug that
//throws errors while building SVG elements.

//Use this in SVGs instead of: cx="{{whatever}}"
//use this: ng-cx={{whatever}}
//See: https://github.com/angular/angular.js/issues/1050
.directive('ngCx', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngCx, function(value) {
      element.attr('cx', value);
    });
  };
})

//Use this in SVGs instead of: cy="{{whatever}}"
//use this: ng-cy={{whatever}}
//See: https://github.com/angular/angular.js/issues/1050
.directive('ngCy', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngCy, function(value) {
      element.attr('cy', value);
    });
  };
});