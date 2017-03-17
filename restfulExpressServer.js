'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
app.set('port', process.env.PORT || 5000)

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const morgan = require('morgan');
app.use(morgan('short'));

app.disable('x-powered-by');


app.get('/pets', function(req, res, next) {
   fs.readFile(petsPath, 'utf8', function (err, data){
      if (err) throw err;
      res.send(JSON.parse(data))
   })
})


app.get('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);
  fs.readFile(petsPath, 'utf8', function (err, data){
     if (err) throw err;
     let pets = JSON.parse(data)
     if (Number.isNaN(index) || index < 0 || index >= pets.length) {
       return res.sendStatus(404);
      }
      res.send(pets[index]);
   })
});

app.post('/pets', function(req, res){
   let pet = req.body
   console.log(pet);
   if (!pet || pet.name == ''){
      return res.sendStatus(400)
   } else {
      fs.readFile(petsPath, 'utf8', function (err, data){
         if (err) throw err;
         let pData = JSON.parse(data)
         pData.push(pet)

         fs.writeFile(petsPath, JSON.stringify(pData), function(err){
            if (err) throw err;
         })
      })
      res.send(pet)
   }
})


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});

module.exports = app;
