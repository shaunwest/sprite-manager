register('services.project', ['endpoints', 'Http'], function(endpoints, Http) {
  'use strict';
  
  return function(projectId) {
    return Http.get(endpoints.projects + '/' + projectId);
  }
});