(function() {
  var ReporteCtrl;

  ReporteCtrl = function($scope, $rootScope, $state, $stateParams, $http, $uibModal, toaster) {
    $scope.test = 'esto es un test para ang';
    $scope.busqueda = {};
    $scope.filtrosVisibles = false;
    $scope.busqueda.distancia
    $scope.busqueda.vegfriendly
    $scope.busqueda.vegfriendly

    $scope.search = function(){
      console.log($scope.busqueda);
      $scope.distancia = $scope.busqueda.distancia;
      $scope.vegfriendly = $scope.busqueda.vegfriendly;
      $scope.costo = $scope.busqueda.costo;

      
    }

    $scope.toggleFilters = function(){
      $scope.filtrosVisibles = !$scope.filtrosVisibles;
      $scope.busqueda.distancia = 0;
      $scope.busqueda.costo = 0;
      $scope.busqueda.vegfriendly = 0;
    }
  }




  angular.module('vegApp').controller('homeCtrl', ReporteCtrl);

})();
