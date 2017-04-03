(function () {
'use strict';

angular.module('MenuApp')
// CategoryItemComponent is just to display category item list, data are assigned from state controller (CategoryItemController)
.component('categoryItemComponent', {
  templateUrl: 'src/restaurant/templates/component/category-item-component.template.html',
  bindings: {
    items: '<' // To access this property on template use: $ctrl.items
               // When inject items is an attribute on html <category-item-component items="catItemCtrl.items">
  }
});

})();
