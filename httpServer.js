'use strict';

const url = require('url');
const fs = require('fs');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 8000;

let server = http.createServer(function(req, res){
   if (req.method === 'GET' && req.url === '/pets') {
      fs.readFile('pets.json', 'utf8', function (err, data){
         if (err) throw err;
         res.setHeader('Content-Type', 'application/json');
         res.end(data);
      })

     }
     else {
       res.statusCode = 404;
       res.setHeader('Content-Type', 'text/plain');
       res.end('Not found');
     }
})

server.listen(port, function(err) {
   if (err) throw err;
   console.log('Listening on port', port);
});




module.exports = server;
