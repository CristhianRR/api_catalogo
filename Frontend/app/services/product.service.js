(function () {
  'use strict';

  angular
    .module('catalogoApp')
    .factory('ProductService', ProductService);

  ProductService.$inject = ['$http'];

  function ProductService($http) {
    var baseUrl = '/api/products';

    return {
      getAll: getAll,
      create: create,
      update: update,
      remove: remove
    };

    function getAll() {
      return $http.get(baseUrl);
    }

    function create(data) {
      return $http.post(baseUrl, data);
    }

    function update(id, data) {
      return $http.put(baseUrl + '/' + id, data);
    }

    function remove(id) {
      return $http.delete(baseUrl + '/' + id);
    }
  }
})();