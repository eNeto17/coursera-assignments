(function () {
'use strict';

angular.module('MenuApp')
// CategoryComponent is just to display category list, data is assigned from state controller (CategoryController)
.component('categoryComponent', {
  templateUrl: 'src/restaurant/templates/component/category-component.template.html',
  bindings: {
    items: '<' // To access this property on template use: $ctrl.items
               // When inject items is an attribute on html <category-component items="catCtrl.items">
  }
});

})();
