var module = angular.module("vegApp", ['ui.router', 'uiRouterStyles', 'ui.bootstrap', 'toaster', 'ngAnimate', 'ngMap', 'ngCookies', 'angularSpinners', 'ngProgress',] );
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
        .state('perfil', {
          url: '/perfil',
          templateUrl: static_url + 'angularapp/html/perfil.html',
          controller: 'perfilCtrl',
          data: {
            css: static_url + 'angularapp/css/perfil.css'
          }
        })
        .state('join', {
          url: '/join',
          templateUrl: static_url + 'angularapp/html/join.html',
          controller: 'joinCtrl',
          data: {
            css: static_url + 'angularapp/css/join.css'
          }
        })
        $urlRouterProvider.otherwise('/home');
    }]);

api_url = 'http://localhost:8000/api/'
api_auth_url = 'http://localhost:8000/auth/'
// api_url = 'https://come-sano.herokuapp.com/api/'
