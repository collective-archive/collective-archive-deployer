var express    = require("express");
var logfmt     = require("logfmt");
var travisPing = require("./travis-ping");

var app = express();
app.use(logfmt.requestLogger());

app.get('/deploy', function(req, res) {
  var travisToken = process.env.TRAVIS_TOKEN
  var repo        = process.env.GH_REPO

  travisPing(travisToken, repo, function(err, result) {
    console.log('hi');
    res.send(result);
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
