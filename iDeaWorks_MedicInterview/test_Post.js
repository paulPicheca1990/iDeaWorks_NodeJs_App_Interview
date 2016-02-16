var http = require('http');

var bodyString = JSON.stringify({
    first_name: "Michael",
    middle_name: "Francais",
    last_name: "Boyko"
});

var headers = {
    'Content-Type': 'application/json',
    'Content-Length': bodyString.length
};

var options = {
    host: 'localhost',
    path: '/app/patient/56c215f49f7397d0dbe5a6ac',
    port: 3000,
    method: 'PUT',
    headers: headers
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

http.request(options, callback).write(bodyString);
