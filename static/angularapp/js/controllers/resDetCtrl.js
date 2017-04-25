(function() {
  var resDetCtrl;

  resDetCtrl = function($scope, $state, $stateParams, $http, $uibModal, toaster, checkApi, NgMap, $cookies) {
    $scope.restaurant_id=$stateParams.id;
    $scope.restaurant_info=[];
    $scope.userLogged = $cookies.getObject('userIsLogged');
    $scope.userID = $cookies.get('userID');
    console.log($scope.userID);
    $scope.onCourse = false;
    $scope.reviewComment;
    $scope.csrf_token = document.getElementById('csrf_token_input').value;
    $scope.reviewCount = 0;
    $scope.reviewAvg = 0;
    $scope.rest = {};
    $scope.rest.rate = 0;
    $scope.review_list = {};
    $scope.userProfileInfo={};
    $scope.userFavorite = 0;
    $scope.userFavorites = {};


    $scope.poperror = function(title_text, body_text){
      toaster.pop('error', title_text, body_text);
    }

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

    $scope.getResenas = function(){
      checkApi.checkRestaurantsReviewsList($scope.restaurant_id)
      .then(function(data){
        $scope.review_list=data.data;
      });
    }

    $scope.sendResena=function(){
      var newInfo = {};
      newInfo.calificacion = $scope.rate;
      newInfo.comentario = $scope.reviewComment;
      newInfo.restaurant = api_url + 'restaurants/' + $scope.restaurant_info.id +'/';
      newInfo.user = api_url + 'users/' + $scope.userID + '/';
      if (newInfo.comentario) {
        checkApi.newReview(newInfo, $scope.csrf_token)
        .then(function(data, error){
          if (data.status === 201) {
            $scope.popsuccess("Tu resena se ha procesado","Gracias por tu retroalimentacion!")
          }else {
            $scope.poperror("No se ha podido mandar tu resena","Intentalo de nuevo!")
          }
        });
      }else {
        $scope.poperror("Necesitas ingresar un comentario","Intentalo de nuevo!")
      }

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
        if($scope.reviewCount>=3){
        $scope.reviewAvg = data.data[0].calificacion__avg
        $scope.rest.rate = $scope.reviewAvg;
        }
      });
    }

    $scope.isUserFav = function(){
      checkApi.getUserFavorites($scope.userID)
      .then(function(data){
        $scope.userFavorites = data.data;
        if ($scope.userFavorites .length > 0) {
          for (var fav in $scope.userFavorites ) {
            if ($scope.restaurant_id == $scope.userFavorites[fav].restaurant) {
              $scope.userFavorite = 1;
            }
          }
        }
      });
    }


    $scope.getRestaurantInfo($scope.restaurant_id);
    $scope.getResenas();
    $scope.reviews();
    if ($scope.userLogged) {
      $scope.isUserFav()
    }
  }




  angular.module('vegApp').controller('resDetCtrl', resDetCtrl);

})();
