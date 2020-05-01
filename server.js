var http = require('http');

var app  = require('./app.js');

var server = http.createServer(app);
  server.listen(8000, function() {
   console.log('Server listening on port '+  server.address().port);
});


