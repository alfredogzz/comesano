(function() {
  var GERService;
  GERService = function($q, $http, $rootScope, $filter, $cookies) {
    var service;
    service = {};
    var g = recomendacion;
var esm = new g.MemESM()
var ger = new g.GER(esm);

ger.initialize_namespace('restaurant')
.then( function() {
  return ger.events([
    {
      namespace: 'restaurant',
      person: 'carlos',
      action: 'likes',
      thing: 'govinda',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'restaurant',
      person: 'carlos',
      action: 'likes',
      thing: 'super salads',
      expires_at: '2020-06-06'
    },
    {
      namespace: 'restaurant',
      person: 'aida',
      action: 'likes',
      thing: 'govinda',
      expires_at: '2020-06-06'
    },
  ])
})
.then( function() {
  // What things might aida like?
  return ger.recommendations_for_person('restaurant', 'aida', {actions: {likes: 1}})
})
.then( function(recommendations) {
  console.log("\nRecommendations For 'aida'")
  console.log(JSON.stringify(recommendations,null,2))
})
.then( function() {
  // What things are similar to govinda?
  return ger.recommendations_for_thing('restaurant', 'govinda', {actions: {likes: 1}})
})
.then( function(recommendations) {
  console.log("\nRecommendations Like 'govinda'")
  console.log(JSON.stringify(recommendations,null,2))
})

    return service;
  };
  return angular.module('vegApp').factory('GERService', GERService);
})();
