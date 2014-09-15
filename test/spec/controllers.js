'use strict';

describe('Controller: MapCtrl', function(){

  var should = chai.should();

  var MapCtrl,
    scope, $httpBackend;

  // load the controller's module
  // registered via anonymous constructor fn in YeomanIonic module
  // instead of controller's fns being in the global namespace
  // Note: AngularJS $controller service retrieves the named controller
  beforeEach(module('YeomanIonic'));

  // Initialize the controller and a mock scope
  // AngularJS injects the $controller service into test fn 

  // AngularJS mock $http service for unit tests by configuring 
  // fake responses to server requests by calling methods on a service 
  // called $httpBackend.

  // Note: injector ignores leading and trailing parameter underscores, allowing 
  // injection of a service and attaching it to a variable
  // with the same name as the service to avoid a name conflict.
  // angular.mock.module and angular.mock.inject are both used.

  // inject helper method injects instances of built-in services parameters
  // into Jasmine's beforeEach fn

  // request $httpBackend service (mock version) be injected into beforeEach fn 
  // Note: in a production environment it facilitates all XHR and JSONP requests
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;

    // use expectGET method to train $httpBackend service to expect incoming HTTP 
    // request and how to respond when we call $httpBackend.flush method 
    $httpBackend.expectGET('data/sentences.json').
    respond([{name: 'Hello'}, {name: 'Greetings'}]);

    // create new scope for the controller 
    scope = $rootScope.$new();
    // create instance of MapCtrl by calling
    // the injected $controller service fn by passing the name of 
    // the controller and the created scope as parameters
    MapCtrl = $controller('MapCtrl', {
      $scope: scope
    });

  }));

  // verify sentences array property on the scope contains 2 records
  it('should attach list of 4 sentences (model) to scope', function () {
    scope.sentences.should.have.length(4);
  });

  // NOT WORKING - gives:
  //   TypeError: 'undefined' is not a function (evaluating 'scope.orderProp.should.have.value('name')')
  // unit test to verify that default ordering property is set
  it('should set the default value of orderProp model', function() {
    // expect(scope.orderProp).toBe('snippet');
    scope.orderProp.should.have.value('name');
  });

  it('should create "sentences" model with 2 sentences fetched from xhr', function() {
    // assertion verifies sentences model not exist on scope before response received
    // expect(scope.sentences).toBeUndefined();
    scope.sentences.should.have.value('undefined');

    // flush the request queue in the browser to cause the promise returned
    // by $http service to be resolved with the trained response
    $httpBackend.flush();

    // expect(scope.sentences).toEqual([{name: 'Hello'},{name: 'Greetings'}]);
    scope.sentences.should.have.value("[{name: 'Hello'},{name: 'Greetings'}]");
  });

});