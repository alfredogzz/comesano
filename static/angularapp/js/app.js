var module = angular.module("vegApp", ['ui.router', 'ui.bootstrap', 'toaster', 'ngAnimate'] );
module.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
});


module.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: static_url + 'angularapp/html/home.html',
          controller: 'homeCtrl'
        })
        $urlRouterProvider.otherwise('/home');
    }]);

api_url = 'http://127.0.0.1:8000/api/'
