(function(){

  'use strict';

  var healthDirectives = angular.module('healthDirectives', [])

  // custom progress bar
  healthDirectives.directive('healthProgress', 
    function() {
      return {
        // invoke directive on element or attribute
        // (i.e. <health-progress ..> or <div health-progress ..>)
        restrict: 'EA',
        // replace original element with template
        replace: true,
        // moves original element content to another location in template
        transclude: true,
        // rename data bound property for local scope
        // to disambiguate the 'title' in the API
        // = - data binds property with property in Directive parent scope
        // @ - pass attribute as string and data bind value in enclosing scope using interpolation {{}} in attribute value
        // & - pass in fn from parent scope to be called later
        scope: { title:'=progressTitle' },
        // template to insert for this directive
        // ng-transclude declares where original content goes and has 
        // access to parent scope
        template: '<div>' + 
          '<div class="title" ng-click="toggle()">{{title}}</div>' +
          '<div class="body" ng-show="showMe" ng-transclude></div>' +
          '</div>',
        // setup for 'showMe' model to track health-progress 
        // open/closed states. toggle fn dfn when user clicks 'title' div
        link: function($scope, $element, $attrs) {
          $scope.showMe = false;
          $scope.toggle = function toggle() {
            $scope.showMe = !$scope.showMe;
          }
        }
      };
    }
  );

  // custom directive to tab bar
  healthDirectives.directive('healthTabs', 
    function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/health-tabs.html',
        cache: true
      };
    }
  );

  // custom directive for health condition estimate
  healthDirectives.directive('healthConditions', 
    function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/health-conditions.html'
      };
    }
  );

  // custom directive for health quotation
  healthDirectives.directive('healthQuotations', 
    function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/health-quotations.html'
      };
    }
  );

})();
