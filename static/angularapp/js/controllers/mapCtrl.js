(function() {
  var MapCtrl;

  MapCtrl = function($scope, $rootScope, $state, $stateParams, $http, $uibModal, toaster, NgMap) {
    NgMap.getMap().then(function(map) {
      var location = map.getCenter();
      console.log(map);
      marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Hello World!'
      });
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
    console.log('done');
  }

  angular.module('vegApp').controller('mapCtrl', MapCtrl);

})();
