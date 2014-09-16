'use strict';

describe('filter', function() {

  // call to load the filter module into the injector for this test run
  beforeEach(module('yeomanIonicFilters'));

  describe('checkmark', function() {

    it('should convert boolean values to unicode checkmark or cross', 
      // call helper function to access the filter we want to test
      // suffix of 'Filter' is appended to filter name when injected
      inject(function(checkmarkFilter) {
        expect(checkmarkFilter(true)).toBe('\u2713');
        expect(checkmarkFilter(false)).toBe('\u2718 ');
      }
    ));

  });
});