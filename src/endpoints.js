register('endpoints', ['/config.json'], function(config) {
  'use strict';

  return {
    projects: config.apiHost + '/projects'
  }; 
});