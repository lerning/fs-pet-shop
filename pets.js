'use strict'
const fs = require('fs')
const path = require('path')

let node = path.basename(process.argv[0])
let file = path.basename(process.argv[1])
let cmd = path.basename(process.argv[2])

if (cmd === 'read'){
   fs.readFile('pets.json', 'utf8', function (err, data){
      if (err) {
         console.error(`USAGE: ${node} ${file} read`);
      } else {
            console.log('success', JSON.parse(data));
         }
   })
} else {
   console.error(`Usage: ${node} ${file} read`);
   process.exit(1);
}
