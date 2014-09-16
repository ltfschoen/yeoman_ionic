'use strict';

var yeomanIonicControllers = angular.module('yeomanIonicControllers', [])

yeomanIonicControllers.controller('MapCtrl', ['$scope', '$ionicLoading', '$http', function($scope, $ionicLoading, $http) {

  // $http service for HTTP request to fetch data from web server asyncronously
  // AngularJS detects and parses the JSON response automatically
  // $http service returns a promise object with a success method
  // assign dataset to scope of the controller as a Model named 'sentences'
  $http({
    method: 'GET',
    url: 'data/sentences.json'
  }).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log('HTTP Request - Success');
      console.log('Data is: ' + data);
      console.log('Status is: ' + status);
      console.log('Headers is: ' + headers);
      console.log('Config is: ' + config);
      console.log('angular.fromJson(data) ==> ' + angular.fromJson(data));
      // console.log('eval(data) ==> ' + eval(data));  
      // $scope.sentences = eval(data); // security issues
      // $scope.sentences = angular.fromJson(data); // works but not required
      $scope.sentences = data;
      console.log(typeof($scope.sentences));

      // pre-process HTTP response by limiting sentences to first 4 on the list
      $scope.sentences = data.splice(0, 4);
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('HTTP Request - Error');
      console.log('Data is: ' + data);
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

// $http service used to fetch JSON files
yeomanIonicControllers.controller('MapDetailCtrl', [
  '$scope', 
  '$routeParams', 
  '$http', 
  function($scope, $routeParams, $http) {
    $http.get('sentences/' + $routeParams.sentenceId + '.json').success(function(data) {
      $scope.sentence = data;
    });
  }
]);
