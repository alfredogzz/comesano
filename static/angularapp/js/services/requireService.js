(function() {
  var GERService;
  GERService = function($q, $http, $rootScope, $filter, $cookies) {
    var service;
    service = {};
    var g = recomendacion;
    console.log(g);
    service.checkRestaurants = function() {
      var defer = $q.defer();
      //http://127.0.0.1:8000/api/restaurants/
      $http({method : 'GET', url : api_url + 'restaurants.json'})
          .then(function(data) {
              defer.resolve(data);
          }, function(error){
            defer.reject(error);
          });
      return defer.promise
    };

    return service;
  };
  return angular.module('vegApp').factory('GERService', GERService);
})();
