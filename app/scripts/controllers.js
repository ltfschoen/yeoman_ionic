'use strict';

angular.module('YeomanIonic.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {

  $scope.sentences = [
    {'name': "Hello",
     'snippet': "1"},
    {'name': "Goodbye", 
     'snippet': "2"},
    {'name': "Greetings", 
     'snippet': "3"},
    {'name': "Cheerio", 
     'snippet': "4"}
  ];

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
});
