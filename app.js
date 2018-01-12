const timeStamp = require('./time.js').timeStamp;
const webApp = require('./webapp');
const fs = require('fs');
const registeredUsers=[{userName:"rahul"},{userName:"raghav"}];
let currentUser=undefined;
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
});

app.post('/index.html',(req,res)=>{
  let user = registeredUsers.find(u=>u.userName==req.body.userName);
  if(!user){
    res.setHeader('Set-Cookie',"message=login failed; Max-Age=5")
    res.redirect("/index.html");
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  currentUser=user;
  res.redirect('/home.html');
});

app.get('/home.html',(req,res)=>{
  res.write(`WELCOME ${currentUser.userName}`);
  res.end();
})

module.exports = app;
