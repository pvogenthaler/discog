var servives = angular.module('discog.directiveFactory', []);

services.factory('DirectiveFactory', function() {
  var myEnter = function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.myEnter);
        });
        event.preventDefault();
      }
    });
  };

  return {
    myEnter: myEnter,
  }
});
