(function() {
  var resDetCtrl;

  resDetCtrl = function($scope, $state, $stateParams, $http, $uibModal, toaster, checkApi, NgMap, $cookies) {
    $scope.restaurant_id=$stateParams.id;
    $scope.restaurant_info=[];
    $scope.userLogged = $cookies.getObject('userIsLogged');
    $scope.userInfo = JSON.parse($cookies.get('userInfo'));
    $scope.onCourse = false;
    $scope.reviewComment;
    $scope.csrf_token = document.getElementById('csrf_token_input').value;
    $scope.reviewCount = 0;
    $scope.reviewAvg = 0;
    $scope.rest = {};
    $scope.rest.rate = 0;
    $scope.popsuccess = function(title_text, body_text){
      toaster.pop('success', title_text, body_text);
    }

    $scope.getRestaurantInfo=function(id){
      checkApi.checkRestaurantPublic(id)
      .then(function(data){
        $scope.restaurant_info = data.data
        NgMap.getMap().then(function(map) {
          $scope.map = map;
          var myLatLng = {lat: parseFloat($scope.restaurant_info.location_lat), lng: parseFloat($scope.restaurant_info.location_lon)};
          $scope.res_marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: $scope.restaurant_info.nombre
          });
          var newBoundary = new google.maps.LatLngBounds();
          newBoundary.extend($scope.res_marker.position)
          $scope.map.fitBounds(newBoundary);
          $scope.map.setZoom(16);
        });
      });
    }

    $scope.nuevaResena = function(){
      $scope.onCourse = !($scope.onCourse);
    }

    $scope.rate = 3;
    $scope.max = 5;

    $scope.ratingStates = [
      {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
      {stateOn: 'glyphicon-heart'},
      {stateOff: 'glyphicon-off'}
    ];

    $scope.sendResena=function(){
      var newInfo = {};
      newInfo.calificacion = $scope.rate;
      newInfo.comentario = $scope.reviewComment;
      newInfo.restaurant = api_url + 'restaurants/' + $scope.restaurant_info.id +'/';
      newInfo.user = api_url + 'users/' + $scope.userInfo.id + '/';
      checkApi.newReview(newInfo, $scope.csrf_token)
      .then(function(data){
        console.log(data);
        $scope.popsuccess("Tu resena se ha procesado","Gracias por tu retroalimentacion!")
      });
      $scope.onCourse = !($scope.onCourse);
      $scope.rate = 3;
      $scope.reviewComment = '';
    }

    $scope.reviews=function(){
      checkApi.checkRestaurantsReviewsCount($scope.restaurant_id)
      .then(function(data){
        $scope.reviewCount = data.data[0].count
        return checkApi.checkRestaurantsReviewsAvg($scope.restaurant_id);

      }).then(function(data){
        if($scope.reviewCount>=5){
        $scope.reviewAvg = data.data[0].calificacion__avg
        $scope.rest.rate = $scope.reviewAvg;
        }
      });
    }

    $scope.getRestaurantInfo($scope.restaurant_id);
    $scope.reviews();
  }




  angular.module('vegApp').controller('resDetCtrl', resDetCtrl);

})();
