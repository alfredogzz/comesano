(function() {
  var MapCtrl;

  MapCtrl = function($scope, $state, $stateParams, $http, $uibModal, toaster, NgMap, checkApi) {
    $scope.restaurants = [];
    $scope.restaurantmarkers = [];
    $scope.map;
    $scope.myLocation;

    $scope.poperror = function(title_text, body_text){
      toaster.pop('error', title_text, body_text);
    }

    $scope.popcomplete = function(title_text, body_text){
      toaster.pop('success', title_text, body_text);
    }

    $scope.calcDistance=function(p1, p2) {
      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }

    $scope.getRestaurants=function(myMap, params){
      checkApi.checkRestaurants()
      .then(function(data){
        $scope.restaurants = data.data;
        //searchParams empty
        for (var index in $scope.restaurants) {
          var item = $scope.restaurants[index];
          var p1 = new google.maps.LatLng(parseFloat(item.location_lat), parseFloat(item.location_lon));
          item.distance = $scope.calcDistance(p1, $scope.myLocation);
        }
        //searchparams empty
        if (params != null){
          var newRestaurants = [];
          console.log(params);
          for (var index in $scope.restaurants) {
            var item = $scope.restaurants[index];
            if (item.distance <= params.distancia && item.veg === params.vegfriendly){
              if(params.costo != "Todos"){
                if(item.price.length <= params.costo.length){
                  newRestaurants.push(item);
                }
              }else {
                newRestaurants.push(item);
              }
            }
          }
          if (newRestaurants.length > 0) {
            $scope.restaurants = newRestaurants;
          }else{
            $scope.poperror("No hay resultados", "Intenta cambiar tu busqueda")
          }

        }

        console.log($scope.restaurants);
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
          newBoundary.extend($scope.mainmarker.position)
          myMap.fitBounds(newBoundary);
      });
    }

    NgMap.getMap().then(function(map) {
      $scope.map = map;
      $scope.myLocation = map.getCenter();
      $scope.mainmarker = new google.maps.Marker({
        position: $scope.myLocation,
        label: 'Tu',
        map: map,
        title: 'Locacion Actual'
      });
      $scope.getRestaurants($scope.map, $stateParams.searchParams);
      });
  }
  angular.module('vegApp').controller('mapCtrl', MapCtrl);

})();
