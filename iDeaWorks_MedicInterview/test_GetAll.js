var http = require('http');

var options = {
    host: 'localhost',
    path: '/app/patients',
    port: 3000,
    method: 'GET'
};

var callback = function(response) {
    var str = '';

//another chunk of data has been recieved, so append it to `str`
    response.on('data', function(chunk) {
        str += chunk;
    });

//the whole response has been recieved, so we just print it out here
    response.on('end', function() {
        console.log(str);
    });
};

http.request(options, callback).end();

