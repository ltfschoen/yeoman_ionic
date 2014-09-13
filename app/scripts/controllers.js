'use strict';

angular.module('YeomanIonic.controllers', [])

// AngularJS looks up its built-in services (prefixed with $) provided as arguments
// as dependencies when controller constructed. Dependency Injection (DI) applies
// the singleton instance of $http service to controller component
// DI checks if Service Instance of $http already instantiated
// else otherwise use Service Factory method fn for $http to construct it.
// inline annotation array of services to inject for corresponding parameter 
// to overcome problem with dependencies otherwise being minified incorrectly
.controller('MapCtrl', ['$scope', '$ionicLoading', '$http', function($scope, $ionicLoading, $http) {

  // $http service for HTTP request to fetch data from web server asyncronously
  // AngularJS detects and parses the JSON response automatically
  // $http service returns a promise object with a success method
  // assign dataset to scope of the controller as a Model named 'sentences'
  // Shortcut method applied below
  $http.get('data/sentences.json').success(function(data) {
    $scope.sentences = data;
  });

  // dataset moved to data/sentences.json

  // default value of orderProp set so initialised in drop-down when used
  $scope.orderProp = 'snippet';
  
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log('Centering');
    if (!$scope.map) {
      return;
    }

    $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $ionicLoading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
}]);
