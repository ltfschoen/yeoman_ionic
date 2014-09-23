(function(){

  'use strict';

  var yeomanIonicDirectives = angular.module('yeomanIonicDirectives', [])

  yeomanIonicDirectives.directive('map', 
    function() {
      return {
        restrict: 'E',
        scope: {
          onCreate: '&'
        },
        link: function ($scope, $element) { // $attr param removed as not used
          function initialize() {
            var mapOptions = {
              center: new google.maps.LatLng(43.07493, -89.381388),
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map($element[0], mapOptions);
      
            $scope.onCreate({map: map});

            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
              e.preventDefault();
              return false;
            });
          }
          google.maps.event.addDomListener(window, 'load', initialize);
        }
      };
    }
  );

  // custom directive to tab bar
  yeomanIonicDirectives.directive('healthTabs', 
    function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/health-tabs.html'
      };
    }
  );

  // custom directive for tab no. 1
  yeomanIonicDirectives.directive('healthTabInfo', 
    function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/health-tab-info.html'
      };
    }
  );


})();
