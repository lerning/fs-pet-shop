'use strict'

const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
let petsPath = path.join(__dirname, 'pets.json');

app.disable('x-powered-by');

app.get('/pets', function(req, res, next) {
   fs.readFile(petsPath, 'utf8', function (err, data){
      if (err) throw err;

      res.send(JSON.parse(data))
   })
})

app.get('/pets/0', function(req, res, next) {
   fs.readFile(petsPath, 'utf8', function (err, data){
      if (err) throw err;

      res.send(JSON.parse(data)[0])
   })
})
app.get('/pets/1', function(req, res, next) {
   fs.readFile(petsPath, 'utf8', function (err, data){
      if (err) throw err;

      res.send(JSON.parse(data)[1])
   })
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
