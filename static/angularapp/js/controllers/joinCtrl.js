(function() {
  var joinCtrl;

  joinCtrl = function($scope,  $rootScope, $state, $stateParams, $http, $uibModal, toaster, checkApi, djangoAuth, $cookies) {
    $scope.loginInfo = {};
    $scope.loginInfo.username;
    $scope.loginInfo.pass1;
    $scope.pass2;
    $scope.loginInfo.email;
    $scope.loginInfo.is_superuser = true;
    $scope.model = {'username':$scope.loginInfo.username,'password':$scope.loginInfo.password};
    $scope.csrf_token = document.getElementById('csrf_token_input').value;
    $cookies.csrftoken = $scope.csrf_token;
    $rootScope.userinfo;

    $scope.poperror = function(title_text, body_text){
      toaster.pop('error', title_text, body_text);
    }



    $scope.login = function(){
      $scope.errors = [];
        djangoAuth.login($scope.loginInfo.username, $scope.loginInfo.password)
        .then(function(data){
        	// success case
          $rootScope.userinfo = $scope.login;
        	$state.go("perfil");
        },function(data){
        	// error case
        	$scope.errors = data;
          console.log($scope.errors);
          $scope.poperror("Error", "Intentalo de nuevo");
        });
    }

    $scope.join = function(){
      if ($scope.loginInfo.password === $scope.pass2) {
        console.log($scope.loginInfo);
        checkApi.newUser($scope.loginInfo, $scope.csrf_token)
        .then(function(data){
          console.log(data);
          if (data.status == 201) { //created successfully
            $scope.login();
          }else if(data.status == 400){
            $scope.poperror(data.data.detail, "Intentalo de nuevo");
          }else {

          }
        });
      }else {
        $scope.poperror("Las contrasenas no coinciden", "Intentalo de nuevo");
      }

    }
  }

  angular.module('vegApp').controller('joinCtrl', joinCtrl);

})();
