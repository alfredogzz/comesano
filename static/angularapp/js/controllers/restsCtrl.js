(function() {
  var restsCtrl;

  restsCtrl = function($scope, $state, $stateParams, $http, $uibModal, toaster, checkApi, NgMap) {
    $scope.restaurants=[];

    $scope.getRestaurants=function(){
      checkApi.checkRestaurants()
      .then(function(data){
        $scope.restaurants = data.data;
        for (var i in $scope.restaurants) {
          restaurant = $scope.restaurants[i];
          checkApi.checkRestaurantsReviewsAvg(restaurant.id)
          .then(function(data){
            var temp = (data.data[0].calificacion__avg);
            if (temp === null){
              restaurant.avg = "pend"
            }else{
              restaurant.avg = temp;
            }
          });
        }
      });
    };


    $scope.getRestaurants();
  }
  angular.module('vegApp').controller('restsCtrl', restsCtrl);

})();
