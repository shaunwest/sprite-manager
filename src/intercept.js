use('Injector', function(Injector) {
  Injector.addInterceptor(/\$(.*)/, function(element) {
    return $(element);
  });

  Injector.addInterceptor(/tmpl-(.*)/, function(element) {
    return $(element).html();
  });
});