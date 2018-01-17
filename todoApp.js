const timeStamp = require('./time.js').timeStamp;
const webApp = require('./webapp');
const fs = require('fs');
const registeredUsers=[{userName:"rahul", pass:"rp123"},
                       {userName:"raghav", pass:"rg234"}];

const UserHandler = require('./lib/userHandler.js');
let todoApp = new UserHandler();

let loadLoginPage= (req,res)=>{
  let content=fs.readFileSync("./public/login.html");
  res.setHeader('Content-Type',getContentType('/login.html'));
  if(req.user) {res.redirect('/home'); return}
  if(req.cookies.message) {
    resetCookie(res,'message');
    res.write(req.cookies.message);
  }
  res.write(content);
  res.end();
}
let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registeredUsers.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let setCookie = (res,key,value)=>{
  res.setHeader('Set-Cookie',`${key}=${value}`);
}
let resetCookie = (res,key)=>{
  res.setHeader('Set-Cookie',`${key}=0; Expires=${new Date(1).toUTCString()}`);
}
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
app.get('/',loadLoginPage);
app.get('/login',loadLoginPage);
app.post('/login',(req,res)=>{
  let user = registeredUsers.find(u=>
    u.userName==req.body.userName && u.pass==req.body.pass);
  if(!user){
    setCookie(res,"message","login failed")
    res.setHeader('Set-Cookie',"message=login failed");
    res.redirect("/login");
    return;
  }
  let sessionid = new Date().getTime();
  setCookie(res,'sessionid',sessionid);
  user.sessionid = sessionid;
  res.redirect('/home');
});

app.get('/home',(req,res)=>{
  if(!req.user){
    setCookie(res,"message","login failed");
    res.redirect("/login");
    return;
  }
  let html=fs.readFileSync("./public/home.html",'utf8');
  res.setHeader('Content-Type',getContentType('/home.html'));
  res.write(`<h1>WELCOME ${req.user.userName}</h1>`);
  res.write(html)
  res.end();
})
app.get('/logout',(req,res)=>{
  if(!req.user){
      setCookie(res,'message',"login first");
      res.redirect('/login');
      return;
    }
  resetCookie(res,'sessionid');
  res.redirect('/login');
});

module.exports = app;
