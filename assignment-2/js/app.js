(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);;

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;
  toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyCtrl.buyItem = function (item, itemIndex) {
    ShoppingListCheckOffService.buyItem(item, itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtCtrl = this;
  alreadyBoughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var boughtItems = [];
  var toBuyItems = [
    { name: "Chips", quantity: "100" },
    { name: "Donuts", quantity: "200" },
    { name: "Cookies", quantity: "300" },
    { name: "Chocolates", quantity: "150" },
    { name: "Candies", quantity: "120" }
  ];

  service.buyItem = function (item, itemIndex) {
    boughtItems.push(item);
    toBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };
  service.getBoughtItems = function () {
    return boughtItems;
  };
}


})();
