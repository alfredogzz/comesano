(function() {
  var ReporteCtrl;

  ReporteCtrl = function($scope, $rootScope, $state, $stateParams, $http, $uibModal, toaster) {
    $scope.test = 'esto es un test para ang';
  }

  $(document).ready(function(){
    $("#btnFiltros").click(function(){
        $("#filters").toggle();
    });
});


  angular.module('vegApp').controller('homeCtrl', ReporteCtrl);

})();
