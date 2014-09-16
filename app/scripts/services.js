// RESTful client w $resource (instead of low-level $http) service
// custom ngResource service to access sentence data on server
// module API registers custom service using factory fn 
var yeomanIonicServices = angular.module('yeomanIonicServices', ['ngResource']);

// pass in service name and factory fn
// declare dependencies on services to inject using fn args
yeomanIonicServices.factory('Sentence', ['$resource',
  function($resource){
    return $resource('sentences/:sentenceId.json', {}, {
      query: {method:'GET', params:{sentenceId:'sentences'}, isArray:true}
    });
  }
]);