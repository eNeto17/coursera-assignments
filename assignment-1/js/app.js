(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.message = "";
  $scope.style = "";

  $scope.checkIfTooMuch = function () {
    if ($scope.dishes.length > 0) {
    $scope.message = areTooMuch($scope.dishes) ? "Too much!" : "Enjoy!";
    $scope.style = "greenStyle";
  } else {
    $scope.message = "Please enter data first";
    $scope.style =  "errorStyle";
  }

  };

  function areTooMuch(string) {
    var count = 0;
    var items = string.split(',');
    for (var i = 0; i < items.length; i++) {
      if (items[i].trim()) {
        count++;
      }
    }
    return count > 3;
  }
}

})();
