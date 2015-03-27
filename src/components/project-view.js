register('projectView', ['article-project', 'getProject'], function(projectArticle, getProject) {
  return function(context) {
    $('article').hide();
    $(projectArticle).show();
    getProject(context.params.id);
  }
});