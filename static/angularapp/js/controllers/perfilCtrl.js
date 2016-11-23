(function() {
  var perfilCtrl;

  perfilCtrl = function($scope,  $rootScope, $state, $stateParams, $http, $uibModal, toaster, checkApi, djangoAuth, $cookies) {
    $scope.userProfileInfo={};
    $scope.username;

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

    $scope.init();
  }

  angular.module('vegApp').controller('perfilCtrl', perfilCtrl);

})();
