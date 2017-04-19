(function() {
  var indexCtrl;

  indexCtrl = function($scope, $state, $stateParams, $http, $uibModal, toaster, djangoAuth, checkApi, $cookies) {
    $scope.csrf_token = document.getElementById('csrf_token_input').value;
    $cookies.csrftoken = $scope.csrf_token;
    $cookies.put('token',$scope.csrf_token);
    $scope.navLogin = {};
    $scope.navLogin.user;
    $scope.navLogin.pass;
    $scope.userLogged = $cookies.getObject('userIsLogged');

    console.log($scope.userLogged);

    $scope.poperror = function(title_text, body_text){
      toaster.pop('error', title_text, body_text);
    }

    $scope.popsuccess = function(title_text, body_text){
      toaster.pop('success', title_text, body_text);
    }

    $scope.logout= function(){
      var tok = $cookies.getObject('auth_token');
      djangoAuth.logout(tok)
      .then(function(data){
        // success case
        $cookies.put('auth_token', null);
        $cookies.put('userInfo', null);
        $cookies.put('userUsername', null);
        $cookies.put('userIsLogged', false);
        $scope.popsuccess("Has salido de tu sesion", "Vuelve pronto :(");
        $state.go("home", {}, { reload: true });
      },function(data){
        // error case
        $scope.errors = data;
        console.log($scope.errors);
        $scope.poperror("Error", "Intentalo de nuevo");
      });
    }


    $scope.loginNav = function (){
      $scope.errors = [];
        checkApi.login($scope.navLogin.user, $scope.navLogin.pass)
        .then(function(data){
          // success case
          console.log(data);
          $cookies.put('auth_token', data.auth_token)
          $cookies.put('userUsername', $scope.navLogin.user);
          //$cookies.put('userID', data);
          checkApi.getUserInfoByUsername($scope.navLogin.user)
          .then(function(data){
            $cookies.put('userID', data.data[0].id);
          })
          $cookies.put('userIsLogged', true);
          $scope.popsuccess("Has entrado a tu sesion", "Listo para comer?");
          $state.go("home", {}, { reload: true });
        },function(data){
          // error case
          $scope.errors = data;
          console.log($scope.errors);
          $scope.poperror("Error", "Intentalo de nuevo");
          $state.go("home", {}, { reload: true });
        });
    }

  }
  angular.module('vegApp').controller('indexCtrl', indexCtrl);

})();
