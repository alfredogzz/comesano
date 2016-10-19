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
        .state('map',{
          url: '/map',
          templateUrl: static_url + 'angularapp/html/map.html',
          controller: 'mapCtrl',
          data: {
            css: static_url + 'angularapp/css/map.css'
          }
        })
        $urlRouterProvider.otherwise('/home');
    }]);

api_url = 'http://127.0.0.1:8000/api/'
