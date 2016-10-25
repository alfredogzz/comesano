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

    $scope.getRestaurants=function(myMap){
      checkformapa.checkRestaurants()
      .then(function(data){
        $scope.restaurants = data.data;
        for (var i in $scope.restaurants) {
          var restaurant = $scope.restaurants[i]
          var myLatLng = {lat: parseFloat(restaurant.location_lat), lng: parseFloat(restaurant.location_lon)};
          marker = new google.maps.Marker({
            position: myLatLng,
            map: myMap,
            label: (parseInt(i)+1).toString(),
            title: 'marker for' + restaurant.nombre
          });
          $scope.restaurantmarkers.push(marker);
          }
          var newBoundary = new google.maps.LatLngBounds();
          for(index in $scope.restaurantmarkers){
            var position = $scope.restaurantmarkers[index].position;
            newBoundary.extend(position);
          }
          myMap.fitBounds(newBoundary);
          for (var index in $scope.restaurants) {
            var item = $scope.restaurants[index];
            var p1 = new google.maps.LatLng(parseFloat(item.location_lat), parseFloat(item.location_lon));
            item.distance = $scope.calcDistance(p1, $scope.myLocation);
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
      $scope.getRestaurants($scope.map);
      });
  }
  angular.module('vegApp').controller('mapCtrl', MapCtrl);

})();
