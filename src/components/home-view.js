register('homeView', ['article-home', 'getProjects'], function(homeArticle, getProjects) {
  return function() {
    $('article').hide();
    $(homeArticle).show();
    return getProjects();
  }
});