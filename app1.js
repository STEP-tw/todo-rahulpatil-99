const Item = require('./lib/item.js');
const File = require('./lib/file.js');
const User = require('./lib/user.js');
const timeStamp = require('./time.js').timeStamp;
const webApp = require('./webapp');
const fs = require('fs');
const registeredUsers=[{userName:"rahul", pass:"rp123"},
                       {userName:"raghav", pass:"rg234"}];

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registeredUsers.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
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
app.use(loadUser);
app.get('/',(req,res)=>{
  let content=fs.readFileSync("./public/index.html");
  res.setHeader('Content-Type',getContentType('/index.html'));
  res.write(content);
  res.end();
});

app.get('/index.html',(req,res)=>{
  let content=fs.readFileSync("./public/index.html");
  res.setHeader('Content-Type',getContentType('/index.html'));
  if(req.cookies.message) {
    res.setHeader('Set-Cookie',`message=login failed; Expires=${new Date(1).toUTCString()}`);
    res.write("wrong input");
  }
  res.write(content);
  res.end();
});

app.post('/index.html',(req,res)=>{
  let user = registeredUsers.find(u=>
    u.userName==req.body.userName && u.pass==req.body.pass);
  if(!user){
    res.setHeader('Set-Cookie',"message=login failed")
    res.redirect("/index.html");
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home.html');
});

app.get('/home.html',(req,res)=>{
  if(!req.user){
    res.redirect("/index.html");
    return;
  }
  let html=fs.readFileSync("./public/home.html",'utf8');
  res.setHeader('Content-Type',getContentType('/home.html'));
  res.write(`<h1>WELCOME ${req.user.userName}</h1>`);
  res.write(html)
  res.end();
})

app.get('/logout.html',(req,res)=>{
  if(!req.user){
      res.redirect('/index.html');
      return;
    }
  res.setHeader('Set-Cookie',`sessionid=0; Expires=${new Date(1).toUTCString()}`);
  res.redirect('/index.html');
});

module.exports = app;
