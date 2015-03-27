register('getProjects')
.depends('services.projects', '$ul-projects[]', 'tmpl-project-link', 'tmpl-no-projects')
.factory(function(projectsService, $ULProjects, _templateProjectLink, _templateNoProjects) {
  'use strict';

  return function () {
    var $listParent = $ULProjects.parent();

    function onResponse(response) {
      var projects = response.data;

      if (projects.length) {
        projects.forEach(function(project) {
          var html = Mustache.render(_templateProjectLink, {
            projectId: project.id,
            projectName: project.name
          });
          $ULProjects.append(html); 
        });
      }
      else {
        $ULProjects.append(Mustache.render(_templateNoProjects));
      }

      $listParent.append($ULProjects);
    }

    $ULProjects.detach();
    $ULProjects.empty();

    return projectsService().then(onResponse);
  }; 
});