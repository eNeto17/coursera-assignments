(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var $ctrl = this;
  if (MenuService.user) {
    $ctrl.user = {};
    $ctrl.user.firstname = MenuService.user.firstname;
    $ctrl.user.lastname = MenuService.user.lastname;
    $ctrl.user.email = MenuService.user.email;
    $ctrl.user.phone = MenuService.user.phone;
    $ctrl.user.dishnumber = MenuService.user.dishnumber;
  }

  $ctrl.submit = function () {
    var valid = $ctrl.isValidDishNumber($ctrl.user.dishnumber.toUpperCase());
    valid.then(function (response) {
      $ctrl.message = response ? "Your information has been saved" : "No such menu number exists";
      if (response) {
        MenuService.user = $ctrl.user;
        MenuService.dish = response;
      }
    });
  };

  $ctrl.isValidDishNumber = function (dishNumber) {
    var parts = dishNumber.match(/([A-Za-z]+)([0-9]+)/);

    return MenuService.getMenuItems(parts[1]).then(function (response) {
      for (var i in response.menu_items) {
        if (response.menu_items[i].short_name == dishNumber){
          console.log("FOUND");
          return response.menu_items[i];
        }
      }
      console.log("NOT FOUND");
      return false;
    }).catch(function (error) {
      console.log("ERROR");
      return false;
    });
  };

}
})();
