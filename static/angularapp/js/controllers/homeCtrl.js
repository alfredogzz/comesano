(function() {
  var ReporteCtrl;

  ReporteCtrl = function($scope, $rootScope, $state, $stateParams, $http, $uibModal, toaster) {
    $scope.test = 'esto es un test';
  }

  angular.module('vegApp').controller('homeCtrl', ReporteCtrl);

})();
