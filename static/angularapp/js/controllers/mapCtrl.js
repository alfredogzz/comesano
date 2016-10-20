(function() {
  var MapCtrl;

  MapCtrl = function($scope, $rootScope, $state, $stateParams, $http, $uibModal, toaster, NgMap, checkformapa) {
    $scope.restaurants = [];
    $scope.restaurantmarkers = [];
    $scope.map;
    $scope.myLocation;

    $scope.calcDistance=function(p1, p2) {
      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }

    $scope.getRestaurants=function(){
      checkformapa.checkRestaurants()
      .then(function(data){
        $scope.restaurants = data.data;
        for (var i in $scope.restaurants) {
          var restaurant = $scope.restaurants[i]
          var myLatLng = {lat: parseFloat(restaurant.location_lat), lng: parseFloat(restaurant.location_lon)};
          marker = new google.maps.Marker({
            position: myLatLng,
            map: $scope.map,
            label: (i + 1),
            title: 'marker for' + restaurant.nombre
          });
          $scope.restaurantmarkers.push(marker);
          }

      });
    }
    NgMap.getMap().then(function(map) {
      $scope.map = map;
      $scope.myLocation = map.getCenter();
      marker = new google.maps.Marker({
        position: $scope.myLocation,
        label: 'Tu',
        map: map,
        title: 'Locacion Actual'
      });

      $scope.getRestaurants();
      });
  }
  angular.module('vegApp').controller('mapCtrl', MapCtrl);

})();
