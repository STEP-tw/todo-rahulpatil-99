const timeStamp = require('./time.js').timeStamp;
const webApp = require('./webapp');
const fs = require('fs');

let getContentType=function(file){
  let fileDetails = file.split('.');
  let extension = fileDetails[1];
  let mimeType={
    "html" : "text/html",
    "css" : "text/css",
    "jpg" : "img/jpg",
    "gif" : "img/gif",
    "js" : "text/javascript",
    "pdf" : "application/pdf"
  }
  return mimeType[extension];
}

let app=webApp.create();

app.get('/',(req,res)=>{
  res.redirect('/index.html');
});

app.get('/index.html',(req,res)=>{
  let content=fs.readFileSync("./public/index.html");
  res.setHeader('Content-Type',getContentType('/index.html'));
  res.write(content);
  res.end();
})

module.exports = app;
