// define animations
var yeomanIonicAnimations = angular.module('yeomanIonicAnimations', ['ngAnimate']);

yeomanIonicAnimations.animation('.sentence', function() {

  // create animation within JS callback by manipulate DOM
  var animateUp = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    // conveyor-belt animation
    element.css({
      position: 'absolute',
      top: 500, // position next element with 500px offset
      left: 0,
      display: 'block'
    });

    // .animate calls 'done' when finished animating
    jQuery(element).animate({
      top: 0
    }, done); // shift previous and new items up 500px

    // optional cleanup fn that is called when animation cancelled due 
    // to another animation on same element or upon animation completion
    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  }

  var animateDown = function(element, className, done) {
    if(className != 'active') {
      return;
    }
    element.css({
      position: 'absolute',
      left: 0,
      top: 0
    });

    jQuery(element).animate({
      top: -500
    }, done);

    return function(cancel) {
      if(cancel) {
        element.stop();
      }
    };
  }

  return {
    // callback fn's called whenever class 
    // added or removed on the element of the 
    // registered class (i.e. .sentence)
    //
    // addClass is fired (with the element param passed in)
    // when '.active' class is added to the 
    // element (via ng-class Directive)
    // 
    // 'done' callback fn is also param passed in 
    // to let AngularJS know when JS animation ended
    addClass: animateUp,
    removeClass: animateDown
  };
});