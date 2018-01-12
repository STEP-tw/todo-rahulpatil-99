const timeStamp = require('./time.js').timeStamp;
const webApp = require('./webapp');
const handlers = require('./handlers.js');
const fs = require('fs');

let app=webApp.create();

app.get('/',(req,res)=>{
  res.redirect('/index.html');
});

module.exports = app;
