(function() {
  var ReporteCtrl;

  ReporteCtrl = function($scope, $rootScope, $state, $stateParams, $http, $uibModal, toaster) {
    $scope.busqueda = {};
    $scope.filtrosVisibles = false;
    $scope.busqueda.distancia
    $scope.busqueda.costo
    $scope.busqueda.vegfriendly

    $scope.search = function(){
      $scope.distancia = $scope.busqueda.distancia;
      $scope.vegfriendly = $scope.busqueda.vegfriendly;
      $scope.costo = $scope.busqueda.costo;
      $state.go('map', {searchParams: $scope.busqueda})

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
