'use strict';

const url = require('url');
const fs = require('fs');
const http = require('http');
const path = require('path');
const port = process.env.PORT || 8000;
let petsPath = path.join(__dirname, 'pets.json');

let server = http.createServer(function(req, res){
   if (req.method === 'GET' && req.url === '/pets') {
      fs.readFile(petsPath, 'utf8', function (err, data){
         if (err) throw err;
         res.setHeader('Content-Type', 'application/json');
         res.end(data);
      })
   } else if (req.method === 'GET' && req.url === '/pets/0') {
      fs.readFile(petsPath, 'utf8', function (err, data){
         if (err) throw err;
         res.setHeader('Content-Type', 'application/json');
         let petZero = (JSON.parse(data)[0]);
         console.log(petZero);
         res.end(JSON.stringify(petZero));
      })
   }  else if (req.method === 'GET' && req.url === '/pets/1') {
      fs.readFile(petsPath, 'utf8', function (err, data){
         if (err) throw err;
         res.setHeader('Content-Type', 'application/json');
         let petOne = (JSON.parse(data)[1]);
         console.log(petOne);
         res.end(JSON.stringify(petOne));
      })
   }
     else {
       res.statusCode = 404;
       res.setHeader('Content-Type', 'text/plain');
       res.end('Not Found');
     }
})

server.listen(port, function(err) {
   if (err) throw err;
   console.log('Listening on port', port);
});




module.exports = server;
