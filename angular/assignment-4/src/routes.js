
(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

// $stateProvider To manage view states
// $urlRouterProvider To manage url redirectorios
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/restaurant/templates/state/home-state.template.html'
    })

    // Category list page
    .state('category-list-state', { // This ID is referenced on home page by: ui-sref="category-list-state"
      url: '/category-list', // Url to access and display on browser
      templateUrl: 'src/restaurant/templates/state/category-state.template.html',
      controller: 'CategoryController as catCtrl', // We use catCtrl on template.html
      resolve: {
        categoryItems: ['MenuDataService', function (MenuDataService) { // categoryItems are injected on CategoryController
          return MenuDataService.getAllCategories().then(function(response) {
            return response.data;
          });
        }]
      }
    })

    // Category Items state from Category List
    .state('category-list-state.item-detail-state', { // Child definition of parent state category-list-state
      url: '/item-detail/{itemId}', // This is accessed on CategoryItemController as $stateParams.itemId
      templateUrl: 'src/restaurant/templates/state/category-item-state.template.html',
      controller: "CategoryItemController as catItemCrtl", // We use catItemCrtl on template.html
      resolve: {
        menuItems: ['MenuDataService', '$stateParams', // menuItems are injected on CategoryController
          function (MenuDataService, $stateParams) { // $stateParams is injected to use url path variable itemId
            return MenuDataService.getItemsForCategory($stateParams.itemId).then(function(response) {
              return response.data.menu_items;
            });
          }]
      }
    });

}

})();
