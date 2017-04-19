(function() {
  var joinCtrl;

  joinCtrl = function($scope,  $rootScope, toaster, djangoAuth, $cookies, checkApi, $state) {
    $scope.loginInfo = {};
    $scope.loginInfo.username;
    $scope.loginInfo.pass1;
    $scope.pass2;
    $scope.loginInfo.email;
    $scope.loginInfo.is_superuser = true;
    $scope.model = {'username':$scope.loginInfo.username,'password':$scope.loginInfo.password};
    $scope.csrf_token = document.getElementById('csrf_token_input').value;
    $cookies.csrftoken = $scope.csrf_token;
    $cookies.put('token',$scope.csrf_token);

    $scope.poperror = function(title_text, body_text){
      toaster.pop('error', title_text, body_text);
    }

    $scope.login = function(){
      $scope.errors = [];
        checkApi.login($scope.loginInfo.username, $scope.loginInfo.password)
        .then(function(data){
        	// success case
          if (data.status == 200) { //created successfully
            $cookies.put('authtoken', data.auth_token)
            $cookies.put('userUsername', $scope.loginInfo.username);
            $cookies.put('userIsLogged', true);
            checkApi.getUserInfoByUsername($scope.navLogin.user)
            .then(function(data){
              $cookies.put('userID', data.data[0].id);
            })
          	$state.go("perfil");
          }else if(data.status == 400){
            $scope.poperror("Error", "Tu usuario o contrasena son incorrectos");
          }
        },function(data){
        	// error case
        	$scope.errors = data;
          console.log($scope.errors);
          $scope.poperror("Error", "Intentalo de nuevo");
        });
    }

    $scope.join = function(){
      if ($scope.loginInfo.password === $scope.pass2) {
        checkApi.newUser($scope.loginInfo, $scope.csrf_token)
        .then(function(data){
          if (data.status == 201) { //created successfully
            $scope.login();
          }else if(data.status == 400){
            console.log('nope');
            $scope.poperror("Error", "Intentalo de nuevo");
          }
        });
      }else {
        $scope.poperror("Las contrasenas no coinciden", "Intentalo de nuevo");
      }

    }
  }

  angular.module('vegApp').controller('joinCtrl', joinCtrl);

})();
