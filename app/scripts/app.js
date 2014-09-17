(function(){

  'use strict';

  var yeomanIonicApp = angular.module('yeomanIonicApp', [
    'ionic', 
    'config', 
    'ngRoute',
    'yeomanIonicControllers', 
    'yeomanIonicDirectives',
    'yeomanIonicServices',
    'yeomanIonicAnimations'
  ]);

  yeomanIonicApp.config(['$routeProvider',
    function($routeProvider) {
      // define our routes
      $routeProvider.
        when('/sentences', {
          templateUrl: 'partials/sentence-list.html',
          controller: 'MapCtrl'
        }).
        // :sentenceId variable extracted into $routeParams object
        when('/sentences/:sentenceId', {
          templateUrl: 'partials/sentence-detail.html',
          controller: 'MapDetailCtrl'
        }).
        otherwise({
          redirectTo: '/sentences'
        }
      );
    }
  ]);

  yeomanIonicApp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        window.StatusBar.styleDefault();
      }
    });
  });

})();