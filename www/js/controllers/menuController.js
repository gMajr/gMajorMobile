angular.module('gmajor.menuController', [])

.controller('MenuController', function ($scope, $location, MenuService) {
  //the operator here checks if logged in and gets different things dependings
  $scope.list = window.sessionStorage.fbtoken ? MenuService.other() : MenuService.all();

  $scope.goTo = function(page) {
    $scope.$broadcast('SideMenuNavigate');
    // a bit wonky, but works in the short term
    if (page !== 'logout'){
      $location.url('/' + page);
    }else{
      $scope.logout();
    }
  };
});
