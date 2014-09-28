(function(){

  'use strict';

  var healthDirectives = angular.module('healthDirectives', [])

  // coordinator for custom progress bars
  healthDirectives.directive('healthProgressBarCoordinator', 
    function() {
      return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div ng-transclude></div>',
        // API with methods to allow communication between healthProgressBars
        controller: function() {
          var healthProgressBars = [];
          // called by progressBars by healthProgressBar Controller 
          // to know to close other open healthProgressBars
          this.gotOpened = function(selectedHealthProgressBar) {
            angular.forEach(healthProgressBars, function(healthProgressBar) {
              if (selectedHealthProgressBar != healthProgressBar) {
                healthProgressBar.showMe = false;
              }
            });
          }
          // called by progressBars to register themselves
          this.addHealthProgressBar = function(healthProgressBar) {
            healthProgressBars.push(healthProgressBar);
          }
        }
      };
    }
  );

  // custom progress bar
  healthDirectives.directive('healthProgressBar', 
    function() {
      return {
        // invoke directive on element or attribute
        // (i.e. <health-progress ..> or <div health-progress ..>)
        restrict: 'EA',
        // replace original element with template
        replace: true,
        // moves original element content to another location in template
        transclude: true,
        // require the healthProgressBarCoordinator 
        // Directive Controller from the parent element
        require: '^?healthProgressBarCoordinator',
        // rename data bound property for local scope
        // to disambiguate the 'title' in the API
        // = - data binds property with property in Directive parent scope
        // @ - pass attribute as string and data bind value in enclosing scope using interpolation {{}} in attribute value
        // & - pass in fn from parent scope to be called later
        scope: { title:'@healthProgressTitle' },
        // template to insert for this directive
        // ng-transclude declares where original content goes and has 
        // access to parent scope
        template: '<div>' + 
          '<div class="title" ng-mouseover="toggle()">{{title}}</div>' +
          '<div class="body" ng-show="showMe" ng-transclude></div>' +
          '</div>',
        // setup for 'showMe' model to track health-progress 
        // open/closed states. toggle fn dfn when user clicks 'title' div
        link: function($scope, $element, $attrs, healthProgressBarCoordinatorController) {
          $scope.showMe = false;
          healthProgressBarCoordinatorController.addHealthProgressBar($scope);

          $scope.toggle = function toggle() {
            $scope.showMe = !$scope.showMe;
            healthProgressBarCoordinatorController.gotOpened($scope);
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
