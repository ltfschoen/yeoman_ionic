(function(){

  'use strict';

  var yeomanIonicControllers = angular.module('yeomanIonicControllers', [])

  yeomanIonicControllers.controller('MapCtrl', ['$scope', '$ionicLoading', 'Sentences', function($scope, $ionicLoading, Sentences) {

    // $resource ngResource service for RESTful
    // assign dataset to scope of the controller as a Model named 'sentences'
    // 'Sentences.query()' GET request to 'data/sentences.json'
    // relies on future object and data-binding to query all sentences
    $scope.sentences = Sentences.query();

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

  // ngResource (instead of $http) service used to fetch JSON files
  yeomanIonicControllers.controller('MapDetailCtrl', [
    '$scope', 
    '$routeParams', 
    'Sentence', 
    function($scope, $routeParams, Sentence) {
      // 'Sentence.get()' GET request to 'data/sentences/hello.json'
      // '.get' instead of just '.query' adds a callback to process the server response
      $scope.sentence = Sentence.get({sentenceId: $routeParams.sentenceId}, function(sentence) {
        $scope.mainImageUrl = sentence.images[0]; // default image
    
        // event handler to change value of default main image
        $scope.setImage = function(imageUrl) {
          $scope.mainImageUrl = imageUrl;
        }
      });
    }
  ]);

})();