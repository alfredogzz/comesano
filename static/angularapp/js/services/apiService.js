(function() {
  var checkApi;
  checkApi = function($q, $http, $rootScope, $filter) {
    var service;
    service = {};
    dateAsString =  $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");

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

    service.checkRestaurantPublic = function(id) {
      var defer = $q.defer();
      //http://127.0.0.1:8000/api/restaurants/id
      $http({method : 'GET', url : api_url + 'restaurants/'+ id + '.json'})
          .then(function(data) {
              defer.resolve(data);
          }, function(error){
            defer.reject(error);
          });
      return defer.promise
    };

    service.newUser = function(newDataJSON, csrf_token){
      var defer = $q.defer();
      //http://127.0.0.1:8000/api/users/
      var req = {
          method: 'POST',
          url: api_url + 'users/',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf_token
          },
          data: newDataJSON
        }
        $http(req)
        .then(function(data){
          return defer.resolve(data)
        },function(data){
          return defer.resolve(data)
        });
        return defer.promise;
    };

    return service;
  };
  return angular.module('vegApp').factory('checkApi', checkApi);
})();
