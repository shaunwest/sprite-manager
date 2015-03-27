register('getProject')
.depends('services.project', '$ul-sprites', 'tmpl-sprite-link', 'tmpl-no-sprites')
.factory(function(projectService, $ULSprites, spriteLinkTemplate, noSpritesTemplate) {
  'use strict';

  var $listParent = $ULSprites.parent();

  return function (projectId) {
    function onResponse (response) {
      var sprites = response.data.sprites;

      if (sprites.length) {
        sprites.forEach(function (sprite) {
          $ULSprites.append(Mustache.render(spriteLinkTemplate, {
            projectId: projectId,
            spriteId: sprite.id,
            spriteName: sprite.name
          }));
        });
      }
      else {
        $ULSprites.append(Mustache.render(noSpritesTemplate));
      }

      $listParent.append($ULSprites); 
    }

    $ULSprites.detach();
    $ULSprites.empty();

    return projectService(projectId).then(onResponse);
  }; 
});