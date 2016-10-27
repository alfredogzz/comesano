(function() {
  var restsCtrl;

  restsCtrl = function($scope, $state, $stateParams, $http, $uibModal, toaster, checkApi, NgMap) {
    $scope.restaurants=[];

    $scope.getRestaurants=function(){
      checkApi.checkRestaurants()
      .then(function(data){
        $scope.restaurants = data.data;
      });
    };

    $scope.getRestaurants();
  }
  angular.module('vegApp').controller('restsCtrl', restsCtrl);

})();
