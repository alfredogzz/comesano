(function() {
  var perfilCtrl;

  perfilCtrl = function($scope,  $rootScope, $state, $stateParams, $http, $uibModal, toaster, checkApi, djangoAuth, $cookies) {
    $scope.userProfileInfo={};
    $scope.username;
    $scope.userLogged = $cookies.getObject('userIsLogged');
    $scope.reviews = {};

    $scope.init = function(){
      $scope.username = $cookies.get('userUsername');
      checkApi.getUserInfoByUsername($scope.username)
      .then(function(data){
        $scope.userProfileInfo.id = data.data[0].id;
        return checkApi.getUserProfileById($scope.userProfileInfo.id);
      }).then(function(data){
        $scope.userProfileInfo.nombre_completo = data.data[0].nombre_completo;
        $cookies.put('userInfo', JSON.stringify($scope.userProfileInfo));
      })
    }

    $scope.getReviews= function(){
      var id = JSON.parse($cookies.get('userInfo')).id;
      checkApi.getUserReviews(id)
      .then(function(data){
        $scope.reviews = data.data;
      });
    }

    $scope.init();
    $scope.getReviews();
  }

  angular.module('vegApp').controller('perfilCtrl', perfilCtrl);

})();
