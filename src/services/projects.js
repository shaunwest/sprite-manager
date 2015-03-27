register('services.projects', ['endpoints', 'Http'], function(endpoints, Http) {
  'use strict';
  
  return function() {
    var promise = Http.get(endpoints.projects);
    console.log(promise);
    return promise;
  }
});