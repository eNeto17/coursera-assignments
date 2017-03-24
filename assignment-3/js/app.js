(function () {
'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', foundItemsDirective);


  function foundItemsDirective() {
    var ddo = {
      templateUrl: 'loader/itemsloaderindicator.template.html',
      scope: {
        found: '<',
        onRemove: '&'
      }
    };
    return ddo;
  }

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nidCtrl = this;
  nidCtrl.showMessage = false;

  nidCtrl.searchMenuItems = function() {
    if (!nidCtrl.searchTerm) {
      nidCtrl.showMessage = true;
      nidCtrl.found = "";
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(nidCtrl.searchTerm);
    promise.then(function (response) {
      nidCtrl.found = response;
      nidCtrl.showMessage = nidCtrl.found.length == 0;
    }).catch(function (error) {
      console.log("ERROR! ", error);
    })
  };

  nidCtrl.onRemove = function (itemIndex) {
    nidCtrl.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      var totalItems = result.data.menu_items;
      var matchItems = [];
      for (var i in totalItems) {
        if (isSearchTermFound(searchTerm, totalItems[i].description)) {
          matchItems.push(totalItems[i]);
        }
      }
      return matchItems;
    });
  };

  function isSearchTermFound(searchTerm, description) {
    return description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  }
}

})();
