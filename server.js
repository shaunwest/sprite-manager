/**
 * server.js
 * created by Shaun 1/17/2015
 */

var express = require('express');
var path = require('path');
global.http = require('http');
var fs = require('fs');
var jsdom = require('jsdom');
//window = jsdom().parentWindow;
var kilo = require('kilo');

global.Promise = require('kilo-extra'); // fix this promise crap!

global.use = kilo.use;
global.register = kilo.register;

global.Mustache = require('./sprite-server');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var app = express();

kilo.use('Injector', function(Injector) {
  Injector.setModule('/config.json', {
    "apiHost": "http://localhost:3000"
  });
});

kilo.use('Injector', function(Injector) {
  function httpGet(url, onComplete, onProgress, contentType) {
    var req = http.request({hostname: url}, function(res) {
      var data = '';

      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        data += chunk;
        if(onProgress) {
          onProgress(chunk.length, data.length);
        }
      });

      res.on('end', function() {
        var contentType = res.headers['content-type'];
        switch(res.statusCode) {
          case 500:
          case 404:
            onComplete('', res.statusCode);
            break;
          case 304:
          default:
            onComplete(parseResponse(contentType, data), res.statusCode);
        }
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
      console.log('URL: ' + url);
    });

    req.end();
  }

  Injector.setModule('httpGet', httpGet);
});

// Configuration
app.set('port', process.env.PORT || 3001);

//app.set('views', __dirname + '/public');
//app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

/*var scriptEl = win.document.createElement('script');
scriptEl.src = 'public/test.js';
doc.body.appendChild(scriptEl);*/

/*
win.console.log = function() {
  console.log.apply(global, Array.prototype.slice.call(arguments, 0))
}

win.onload = function() {
  win.XMLHttpRequest = XMLHttpRequest;
  console.log('fasdfadsf');
  console.log(win.document.getElementById('test').innerHTML);
};
*/

/*app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public') + '/index.html');
});*/
jsdom.env('public/main.html', [], function(errors, win) {
  global.window = win;
  global.document = win.document;
  global.$ = require('./bower_components/jquery/dist/jquery');
});

app.get('/', function(req, res) {
  use('homeView', function(homeView) {
    homeView().then(function() {
      res.send(window.document.documentElement.outerHTML);
    });
  });
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
