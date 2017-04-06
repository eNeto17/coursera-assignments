(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryController', CategoryController);

// This controller is injected on states definition (routes.js)
CategoryController.$inject = ['categoryItems']; // categoryItems is a resolve property injected on state definition
function CategoryController(categoryItems) {      // categoryItems are retrieved from MenuDataService invoked on state definition
  var categorylist = this;
  categorylist.items = categoryItems;
}

})();
