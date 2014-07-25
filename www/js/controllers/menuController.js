angular.module('gmajor.menuController', [])

.controller('MenuController', function($scope, $location, MenuService) {

  $scope.list = MenuService.all();


  $scope.checkAuth = function() {
    if (window.sessionStorage.fbtoken) {
      return true;
    } else {
      return false;
    }
  }

  $scope.goTo = function(page) {
    $scope.$broadcast('SideMenuNavigate');
    // a bit wonky, but works in the short term
    if (page !== 'logout') {
      $location.url('/' + page);
    } else {
      $scope.logout();
    }
  };
});