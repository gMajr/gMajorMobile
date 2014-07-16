angular.module('gmajor.menuController', [])

.controller('MenuController', function ($scope, $location, MenuService) {
  // "MenuService" is a service returning mock data (services.js)
  $scope.list = MenuService.all();

  $scope.goTo = function(page) {
    $scope.$broadcast('SideMenuNavigate');
    console.log('Going to ' + page);
    $location.url('/' + page);
  };
});
