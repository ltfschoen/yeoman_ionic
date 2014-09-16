'use strict';

// 'checkmark' filter
angular.module('yeomanIonicFilters', []).filter('checkmark', function() {
  return function(input) {
    // unicode - tick (true)
    // unicode - cross (false)
    return input ? '\u2713' : '\u2718';
  };
});
