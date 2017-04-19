(function() {
  var restsCtrl;

  restsCtrl = function($scope, $state, $stateParams, $http, $uibModal, toaster, checkApi, NgMap) {
    $scope.restaurants=[];

    $scope.getRestaurants=function(){
      checkApi.checkRestaurants()
      .then(function(data){
        $scope.restaurants = data.data;
        for (var i in $scope.restaurants) {
          var restaurant = $scope.restaurants[i];
          return checkApi.checkRestaurantsReviewsAvg($scope.restaurants[i].id)
          .then(function(data){
            var temp = (data.data[0].calificacion__avg);
            if (temp === null){
              $scope.restaurants[i].avg = "pend"
            }else{
              $scope.restaurants[i].avg = temp;
            }
          });
        }
      });
    };


    $scope.getRestaurants();
  }
  angular.module('vegApp').controller('restsCtrl', restsCtrl);

})();
