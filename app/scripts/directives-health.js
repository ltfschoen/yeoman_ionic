(function(){

  'use strict';

  var healthDirectives = angular.module('healthDirectives', [])

  // custom directive to tab bar
  healthDirectives.directive('healthTabs', 
    function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/health-tabs.html'
      };
    }
  );

  // custom directive for health condition
  healthDirectives.directive('healthConditions', 
    function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/health-conditions.html'
      };
    }
  );

})();
