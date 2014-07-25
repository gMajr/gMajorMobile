angular.module('gmajor.authNav', [])
.directive("authNav", function(){

return {
	restrict:"E",
	templateUrl:"templates/authnav.html",
	controller: function($rootScope, $scope, MenuService){
		 $scope.list = window.sessionStorage.fbtoken ? MenuService.other() : MenuService.all();
		 $rootScope.toggleMenu = function(){
		 	$scope.apply($scope.list);
		 	console.log('toggled');
		 }
	}
}
})