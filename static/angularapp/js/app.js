var module = angular.module("vegApp", ['ui.router', 'uiRouterStyles', 'ui.bootstrap', 'toaster', 'ngAnimate', 'ngMap'] );
module.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});


module.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: static_url + 'angularapp/html/home.html',
          controller: 'homeCtrl',
          data: {
            css: static_url + 'angularapp/css/home.css'
          }
        })
        .state('mapa',{
          url: '/mapa',
          templateUrl: static_url + 'angularapp/html/map.html',
          controller: 'mapCtrl',
          data: {
            css: static_url + 'angularapp/css/map.css'
          },
          params: {searchParams: null}
        })
        .state('restaurant_detail',{
          url: '/restaurant/:id',
          templateUrl: static_url + 'angularapp/html/restaurant_detail.html',
          controller: 'resDetCtrl',
          data: {
            css: static_url + 'angularapp/css/restaurant_detail.css'
          }
        })
        .state('restaurants', {
          url: '/restaurants',
          templateUrl: static_url + 'angularapp/html/restaurants.html',
          controller: 'restsCtrl',
          data: {
            css: static_url + 'angularapp/css/restaurants.css'
          }
        })
        $urlRouterProvider.otherwise('/home');
    }]);

api_url = 'http://127.0.0.1:8000/api/'
