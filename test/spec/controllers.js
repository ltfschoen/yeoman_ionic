'use strict';

describe('Controller: MapCtrl', function(){

  var should = chai.should();

  // load the controller's module
  // registered via anonymous constructor fn in YeomanIonic module
  // instead of controller's fns being in the global namespace
  // Note: AngularJS $controller service retrieves the named controller
  beforeEach(module('YeomanIonic'));

  var MapCtrl,
    scope;

  // Initialize the controller and a mock scope
  // AngularJS injects the $controller service into test fn 
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    // create instance of MapCtrl using $controller service
    MapCtrl = $controller('MapCtrl', {
      $scope: scope
    });
  }));

  // verify sentences array property on the scope contains 2 records
  it('should attach list of 2 sentences (model) to scope', function () {
    scope.sentences.should.have.length(2);
  });

});