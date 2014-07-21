// angular.module is a global place for creating, registering and retrieving Angular modules
// 'gmajor' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'gmajor.services' is found in services.js
// 'gmajor.controllers' is found in controllers.js
// etc.
// if there is a better way to organize this, please feel free to do so
angular.module('gmajor', ['ionic',
                          'gmajor.gridController',
                          'gmajor.loginController',
                          'gmajor.chatsController',
                          'gmajor.chatController',
                          'gmajor.chatsFactory',
                          'gmajor.commentController',
                          'gmajor.commentFactory',
                          'gmajor.gridService',
                          'gmajor.menuController',
                          'gmajor.menuService',
                          'gmajor.userController',
                          'gmajor.userService',
                          'gmajor.main',
                          'gmajor.gridTargetFactory',
                          'gmajor.directives'
                          ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
// sets router
.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('grid', {
          url: '/grid',
          controller: 'GridController',
          templateUrl: 'templates/grid.html'
      })
      .state('login', {
          url: '/login',
          controller: 'LoginController',
          templateUrl: 'templates/login.html'
      })
      .state('chats', {
          url: '/chats',
          controller: 'ChatsController',
          templateUrl: 'templates/chats.html'
      })
      .state('chat', {
          url: '/chat',
          controller: 'ChatController',
          templateUrl: 'templates/chat.html'
      })
      .state('comment', {
          url: '/comment',
          controller: 'CommentController',
          templateUrl: 'templates/comment.html'
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

