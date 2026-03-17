(function () {
  'use strict';

  angular
    .module('catalogoApp', [])
    .directive('fileModel', fileModelDirective)
    .filter('cop', copFilter);

  /* Convierte un input[type=file] a base64 y lo asigna al ng-model */
  fileModelDirective.$inject = ['$parse'];
  function fileModelDirective($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('change', function () {
          var file = element[0].files[0];
          if (!file) return;
          var reader = new FileReader();
          reader.onload = function (e) {
            scope.$apply(function () {
              $parse(attrs.fileModel).assign(scope, e.target.result);
            });
          };
          reader.readAsDataURL(file);
        });
      }
    };
  }

  /* Formatea números al estándar COP: $15.000 */
  function copFilter() {
    return function (value) {
      if (value === null || value === undefined || value === '') return '';
      return '$' + Number(value).toLocaleString('es-CO');
    };
  }
})();
