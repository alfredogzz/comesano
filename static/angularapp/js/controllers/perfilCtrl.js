(function() {
  var perfilCtrl;

  perfilCtrl = function($scope,  $rootScope, $state, $stateParams, $http, $uibModal, toaster, checkApi, djangoAuth, $cookies) {
    $scope.userProfileInfo={};
    $scope.username;
    $scope.userLogged = $cookies.getObject('userIsLogged');
    $scope.reviews = {};

    $scope.init = function(){
      if ($scope.userLogged) {
        $scope.username = $cookies.get('userUsername');
        checkApi.getUserInfoByUsername($scope.username)
        .then(function(data){
          console.log(data);
          $scope.userProfileInfo.id = data.data[0].id;
          $scope.userProfileInfo.nombre_completo = $scope.username;
          return checkApi.getUserProfileById($scope.userProfileInfo.id);
        }).then(function(data){
          console.log(data);
          if (data.data.length == 0) {
            console.log('no hay perfil');
          }else {
            $scope.userProfileInfo.nombre_completo = data.data[0].nombre_completo;
            $cookies.put('userInfo', JSON.stringify($scope.userProfileInfo));
          }
        })
      };

    }

    $scope.getReviews= function(){
      if ($scope.userProfileInfo.id != undefined) {
        var id = $scope.userProfileInfo.id
        checkApi.getUserReviews(id)
        .then(function(data){
          console.log(data);
          $scope.reviews = data.data;
        });
      };
    }

    $scope.init();
    $scope.getReviews();
  }

  angular.module('vegApp').controller('perfilCtrl', perfilCtrl);

})();
