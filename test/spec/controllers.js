'use strict';

describe('Controller: MapCtrl', function(){

  var should = chai.should();

  // load the controller's module
  beforeEach(module('YeomanIonic'));

  var MapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapCtrl = $controller('MapCtrl', {
      $scope: scope
    });
  }));

  it('should attach list of 3 sentences (model) to scope', function () {
    scope.sentences.should.have.length(2);
  });

});