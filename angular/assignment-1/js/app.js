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
    var totalItems = getTotalItems($scope.dishes);
    if (totalItems > 0) {
      $scope.message = isTooMuchItems(totalItems) ? "Too much!" : "Enjoy!";
      $scope.style = "greenStyle";
    } else {
      $scope.message = "Please enter data first";
      $scope.style =  "errorStyle";
    }

  };

  function getTotalItems(string) {
    var count = 0;
    var items = string.split(',');
    for (var i = 0; i < items.length; i++) {
      if (items[i].trim()) {
        count++;
      }
    }
    return count;
  }

  function isTooMuchItems(items) {
      return items > 3;
    }

}

})();
