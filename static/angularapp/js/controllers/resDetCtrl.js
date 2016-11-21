(function() {
  var resDetCtrl;

  resDetCtrl = function($scope, $state, $stateParams, $http, $uibModal, toaster, checkApi, NgMap) {
    $scope.restaurant_id=$stateParams.id;
    $scope.restaurant_info=[];

    $scope.getRestaurantInfo=function(id){
      checkApi.checkRestaurantPublic(id)
      .then(function(data){
        $scope.restaurant_info = data.data
        NgMap.getMap().then(function(map) {
          $scope.map = map;
          var myLatLng = {lat: parseFloat($scope.restaurant_info.location_lat), lng: parseFloat($scope.restaurant_info.location_lon)};
          $scope.res_marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: $scope.restaurant_info.nombre
          });
          var newBoundary = new google.maps.LatLngBounds();
          newBoundary.extend($scope.res_marker.position)
          $scope.map.fitBounds(newBoundary);
          $scope.map.setZoom(16);
        });
      });
    }

    $scope.getRestaurantInfo($scope.restaurant_id);

  }




  angular.module('vegApp').controller('resDetCtrl', resDetCtrl);

})();
