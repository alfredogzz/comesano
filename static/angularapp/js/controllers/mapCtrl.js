(function() {
  var MapCtrl;

  MapCtrl = function($scope, $state, $stateParams, $timeout , $http, $uibModal, toaster, NgMap, checkApi) {
    $scope.restaurants = [];
    $scope.restaurantmarkers = [];
    $scope.map;
    $scope.myLocation;
    $scope.mapIsLoaded = false;

    $scope.poperror = function(title_text, body_text){
      toaster.pop('error', title_text, body_text);
    }

    $scope.popcomplete = function(title_text, body_text){
      toaster.pop('success', title_text, body_text);
    }

    $scope.calcDistance=function(p1, p2) {
      console.log(p1.toString);
      console.log(p2.toString);
      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }

    $scope.loading = true;

    NgMap.getMap("map").then(function(map) {
      console.log(map);

      $timeout(function() {
        $scope.map = map;
        console.log(map.getCenter());
        $scope.myLocation = map.getCenter();
        console.log($scope.myLocation);
        //arreglar marcadores repetidos
        $scope.mainmarker = new google.maps.Marker({
          position: $scope.myLocation,
          label: 'Tu',
          map: map,
          title: 'Locacion Actual'
        });
        $scope.getRestaurants($scope.map, $stateParams.searchParams);
        $scope.loading = false;
      }, 3500);

    });

    $scope.getRestaurants=function(myMap, params){
      checkApi.checkRestaurants()
      .then(function(data){
        $scope.restaurants = data.data;
        console.log(data);
        for (var index in $scope.restaurants) {
          var item = $scope.restaurants[index];
          var lat = parseFloat(item.location_lat);
          var lon = parseFloat(item.location_lon);
          var p1 = new google.maps.LatLng(lat, lon);
          console.log(p1);
          console.log($scope.myLocation);
          item.distance = $scope.calcDistance(p1, $scope.myLocation);
          }
          //searchparams not empty
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
                } else {
                    newRestaurants.push(item);
                }
              }
            }
            if (newRestaurants.length > 0) {
              $scope.restaurants = newRestaurants;
            } else {
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
              label: (parseInt(restaurant.id)).toString(),
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
          myMap.setZoom((myMap.getZoom()));
        });
      };
  }
  angular.module('vegApp').controller('mapCtrl', MapCtrl);

})();
