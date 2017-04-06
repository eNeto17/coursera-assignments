(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryItemController', CategoryItemController);

// This controller is injected on states definition (routes.js)
CategoryItemController.$inject = ['menuItems']; // menuItems is a resolve property injected on state definition
function CategoryItemController(menuItems) {      // menuItems are retrieved from MenuDataService invoked on state definition
  var itemDetailList = this;
  itemDetailList.items = menuItems;
}

})();
