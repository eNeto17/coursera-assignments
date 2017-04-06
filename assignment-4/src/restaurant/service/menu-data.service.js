(function () {
'use strict';

angular.module('MenuData')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

// Service to retrieve data from web services rest calls, it's injected on satate definition
MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    var response = $http({
      url: (ApiBasePath + "/categories.json")
    });
    return response;
  };

  service.getItemsForCategory = function(categoryShortName) {
    var response = $http({
      url: (ApiBasePath + "/menu_items.json"),
      params: { category: categoryShortName }
    });
    return response;
  };

}

})();
