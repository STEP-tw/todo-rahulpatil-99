const timeStamp = require('./time.js').timeStamp;
const webApp = require('./webapp');
const fs = require('fs');
const registeredUsers=[{userName:"rahul", pass:"rp123"},
                       {userName:"raghav", pass:"rg234"}];
const toHtml = require('./src/toHtml.js');
const CurrentUser = require('./src/currentUser.js')
let converter=new toHtml();
let currentUser=new CurrentUser();


let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registeredUsers.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let redirectUnloggedUserToLogin= (req,res)=>{
  let urls=['/home','/create','/logout','/view'];
  if(req.urlIsOneOf(urls) && !req.user){
    res.setHeader('Set-Cookie',"message=login properly!");
    res.redirect("/login");
  }
}
let redirectLoggedUserToHome= (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && req.user){
    res.redirect("/home");
  }
}

let loadLoginPage= (req,res)=>{
  let content=fs.readFileSync("./public/login.html");
  res.setHeader('Content-Type',getContentType('/login.html'));
  if(req.cookies.message) {
    resetCookie(res,'message');
    res.write(req.cookies.message);
  }
  res.write(content);
  res.end();
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
app.use(redirectUnloggedUserToLogin);
app.use(redirectLoggedUserToHome);

app.get('/',loadLoginPage);
app.get('/login',loadLoginPage);
app.post('/login',(req,res)=>{
  let user = registeredUsers.find(u=>
    u.userName==req.body.userName && u.pass==req.body.pass);
  if(!user){
    res.setHeader('Set-Cookie',"message=login properly!");
    res.redirect("/login");
    return;
  }
  currentUser.storeUser(user.userName);
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
});
app.get('/home',(req,res)=>{
  let html=fs.readFileSync("./public/home.html",'utf8');
  res.setHeader('Content-Type',getContentType('/home.html'));
  let userFiles=currentUser.getAllTitle();
  let todos=converter.convertToRadio(userFiles);
  res.write(`<h1>WELCOME ${req.user.userName}</h1>`);
  let newHtml=html.replace('replacer',todos);
  res.write(newHtml);
  res.end();
});
app.get('/create',(req,res)=>{
  let html = fs.readFileSync('./public/create.html');
  res.setHeader('Content-Type',getContentType('/create.html'));
  res.write(html);
  res.end();
});
app.post('/create',(req,res)=>{
  currentUser.addTodo(req.body);
  res.redirect('/home');
});
app.post('/view',(req,res)=>{
  let html=fs.readFileSync("./public/view.html",'utf8');
  res.setHeader('Content-Type',getContentType('/home.html'));
  let todo = currentUser.getTodo(req.body.todo);
  let convertedTodo=converter.convertTodoToHtml(todo);
  let newHtml=html.replace('replacer',convertedTodo);
  res.write(newHtml);
  res.end();
});
app.get('/add',(req,res)=>{
  let html = fs.readFileSync('./public/addItem.html');
  res.setHeader('Content-Type',getContentType('/addItem.html'));
  res.write(html);
  res.end();
});

app.get('/logout',(req,res)=>{
  resetCookie(res,'sessionid');
  res.redirect('/login');
});

module.exports = app;
