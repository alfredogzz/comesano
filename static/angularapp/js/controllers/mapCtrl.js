(function() {
  var MapCtrl;

  MapCtrl = function($scope, $state, $stateParams, $timeout , $http, $uibModal, toaster, NgMap, checkApi, ngProgressFactory) {
    $scope.restaurants = [];
    $scope.restaurantmarkers = [];
    $scope.map;
    $scope.myLocation;
    $scope.mapIsLoaded = false;
    $scope.barra = {}
    $scope.barra.text = "Bienvenido! Usa los filtros para refinar tu busqueda o haz click en alguna opcion para ver mas info!"
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.setHeight('10px');
    $scope.progressbar.setParent(document.getElementById('mapContainer'));
    $scope.busqueda = {};

    $scope.poperror = function(title_text, body_text){
      toaster.pop('error', title_text, body_text);
    }

    $scope.popcomplete = function(title_text, body_text){
      toaster.pop('success', title_text, body_text);
    }

    $scope.calcDistance=function(p1, p2) {
      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    }

    NgMap.getMap("map").then(function(map) {
      $scope.progressbar.start();
      //falla despues de cambiar de tab dos veces, no se remueven los marcadores anteriores y aparecen vacios cuando carga el scope
      $timeout(function() {
        $scope.map = map;
        $scope.restaurantmarkers = new Array();
        $scope.myLocation = map.getCenter();
        if ($scope.restaurantmarkers.length <= 1) {
          $scope.mainmarker = new google.maps.Marker({
            position: $scope.myLocation,
            label: 'Tu',
            title: 'Locacion Actual'
          });
          $scope.mainmarker.setMap(map);
          $scope.restaurantmarkers.push($scope.mainmarker);
          $scope.getRestaurants($scope.map, $stateParams.searchParams);
          $scope.progressbar.complete();
        }else {
          $scope.restaurantmarkers.length = 1;
          $scope.getRestaurants($scope.map, $stateParams.searchParams);
          $scope.progressbar.complete();
        }
      }, 3500);

    });


    $scope.attachSecretMessage= function(marker, secretMessage)  {
      marker.addListener('click', function() {
        console.log(secretMessage);
        $scope.barra.text = secretMessage.nombre;
        $scope.$apply();
      });
    };

    $scope.getRestaurants=function(myMap, params){
      checkApi.checkRestaurants()
      .then(function(data){
        console.log($scope.myLocation);
        $scope.restaurants = data.data;
        for (var index in $scope.restaurants) {
          var item = $scope.restaurants[index];
          var lat = parseFloat(item.location_lat);
          var lon = parseFloat(item.location_lon);
          var p1 = new google.maps.LatLng(lat, lon);
          item.distance = $scope.calcDistance(p1, $scope.myLocation);
          }
          //searchparams not empty
          if (params != null){
            var newRestaurants = [];
            for (var index in $scope.restaurants) {
              var item = $scope.restaurants[index];
              console.log(item);
              var isGood = false;
              if ($scope.busqueda.distancia !== undefined && item.distance <= $scope.busqueda.distancia ) {
                isGood = true;
              };
              //aplicar bien
              if ($scope.busqueda.vegfriendly !== undefined && item.veg === $scope.busqueda.vegfriendly) {
                isGood = true
              };
              if ($scope.busqueda.price !== undefined && item.price.length <=  $scope.busqueda.costo.length) {
                isGood = true;
              }
              if (isGood) {
                newRestaurants.push(item);
              }
            }
            if (newRestaurants.length > 0) {
              $scope.restaurants = newRestaurants;
            } else {
              $scope.poperror("No hay resultados", "Intenta cambiar tu busqueda")
            }
          }
          for (var i in $scope.restaurants) {
            var restaurant = $scope.restaurants[i]
            var myLatLng = {lat: parseFloat(restaurant.location_lat), lng: parseFloat(restaurant.location_lon)};
            var marker = new google.maps.Marker({
              position: myLatLng,
              map: myMap,
              label: (parseInt(restaurant.id)).toString(),
              title: 'marker for' + restaurant.nombre
            });
            $scope.attachSecretMessage(marker, restaurant);
            $scope.restaurantmarkers.push(marker);
            }
          var newBoundary = new google.maps.LatLngBounds();
          for(index in $scope.restaurantmarkers){
            var position = $scope.restaurantmarkers[index].position;
            newBoundary.extend(position);
          }
          console.log($scope.restaurantmarkers);
          newBoundary.extend($scope.mainmarker.position)
          myMap.fitBounds(newBoundary);
          myMap.setZoom((myMap.getZoom()));

        });
      };

      $scope.search=function(){
        $scope.progressbar.start();
        console.log($scope.busqueda);
        $scope.getRestaurants($scope.map, $scope.busqueda);
        $scope.progressbar.complete();
      };
  }
  angular.module('vegApp').controller('mapCtrl', MapCtrl);

})();
