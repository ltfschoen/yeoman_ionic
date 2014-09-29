(function(){

  'use strict';

  var mapControllers = angular.module('mapControllers', [])

  mapControllers.controller('MapCtrl', ['$scope', '$ionicLoading', '$cookies', '$cookieStore', 'Sentences', function($scope, $ionicLoading, $cookies, $cookieStore, Sentences) {

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

    // HEALTH CONDITIONS DIRECTIVE
    
    // default value
    $scope.health = { conditionEstimate: 0 };

    // computed when user changes input value 
    // Note: ng-change Directive not required as using $watch instead
    $scope.computeNeeded = function () {
      $scope.health.needed = $scope.health.conditionEstimate * 5;
    };

    $scope.requestQuotation = function () {
      if ($scope.health > 100) {
        console.log("Sorry, you're already healthy with health of: " + $scope.health.needed);
      } else {
        $scope.health.quote = $scope.health.conditionEstimate * 50;
        console.log("Quote provided: " + $scope.health.quote);
        
      };
    };

    // Note: 'shareQuotation' is not $watched, so output only after user clicks the "Share Quotation" button
    $scope.shareQuotation = function () {
      var shareFee = 20;
      $scope.health.quoteShared = $scope.health.quote + shareFee;
      console.log("Quote after quote sharing fees: " + $scope.health.quoteShared);
    };

    // watch operations of this AngularJS expression string
    $scope.$watch('health.conditionEstimate', $scope.computeNeeded);
    $scope.$watch('health.conditionEstimate', $scope.requestQuotation);
    // $scope.$watch('health.conditionEstimate', $scope.shareQuotation);

    // HEALTH PROGRESS INFO

    // values of enclosing scope of progress bar 
    $scope.healthProgressBars = [
      { title: 'Bar 1 Title',
        text:  'Bar 1 Text'
      },
      { title: 'Bar 2 Title',
        text:  'Bar 2 Text'
      },
      { title: 'Bar 3 Title',
        text:  'Bar 3 Text'
      }
    ];

    // SHARED QUOTE COUNTER

    $scope.sharedQuoteCount = 0;

    $scope.$on('SharedQuote', function() {
      $scope.sharedQuoteCount++;
    });

  }]);

  // ngResource (instead of $http) service used to fetch JSON files
  mapControllers.controller('MapDetailCtrl', [
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