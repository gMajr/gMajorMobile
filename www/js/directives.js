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
})

//Use this in SVGs instead of: r="{{whatever}}"
//use this: ng-r={{whatever}}
//See: https://github.com/angular/angular.js/issues/1050
.directive('ngR', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngR, function(value) {
      element.attr('r', value);
    });
  };
})

//Use this in SVGs instead of: x="{{whatever}}"
//use this: ng-x={{whatever}}
//See: https://github.com/angular/angular.js/issues/1050
.directive('ngX', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngX, function(value) {
      element.attr('x', value);
    });
  };
})

//Use this in SVGs instead of: y="{{whatever}}"
//use this: ng-y={{whatever}}
//See: https://github.com/angular/angular.js/issues/1050
.directive('ngY', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngY, function(value) {
      element.attr('y', value);
    });
  };
})

//Use this in SVGs instead of: width="{{whatever}}"
//use this: ng-width={{whatever}}
//See: https://github.com/angular/angular.js/issues/1050
.directive('ngWidth', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngWidth, function(value) {
      element.attr('width', value);
    });
  };
})

//Use this in SVGs instead of: height="{{whatever}}"
//use this: ng-height={{whatever}}
//See: https://github.com/angular/angular.js/issues/1050
.directive('ngHeight', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.ngHeight, function(value) {
      element.attr('height', value);
    });
  };
});
