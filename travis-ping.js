var request   = require("request-json");

var get = function(url, token, cb) {
  var client = request.newClient('https://api.travis-ci.org/');
  var url  = url + '?access_token=' + token;

  client.get(url, function(error, response, body) {
    cb(error, body);
  });
};

var post = function(url, token, data, cb) {
  var client = request.newClient('https://api.travis-ci.org/');
  var url  = url + '?access_token=' + token;

  client.post(url, data, function(error, response, body) {
    cb(error, body);
  });
};

var travisPing = function(token, repo, cb) {
  get('repos/' + repo + '/builds', token, function(err, body) {
    var lastBuild = body[0].id;

    post('/requests', token, { 'build_id': lastBuild }, function(err, body) {
      cb(err, body);
    });
  });
};

module.exports = travisPing;
