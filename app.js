const timeStamp = require('./time.js').timeStamp;
const webApp = require('./webapp');
const fs = require('fs');
const registeredUsers=[{userName:"rahul"},{userName:"raghav"}];
let currentUser=undefined;
let currentTodoFile=undefined;

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
let createFileForNewUser=function(){
  if(!fs.existsSync(`./data/${currentUser.userName}.json`)){
    console.log("hii");
    fs.writeFileSync(`./data/${currentUser.userName}.json`," ");
  }
  return;
}
let getUserData=function(){
  let userData=fs.readFileSync(`./data/${currentUser.userName}.json`,'utf8');
  return JSON.parse(userData);
}
let getTODO=function(todoName){
  let data=getUserData();
  return data[todoName];
}
let convertTODOtoHtml=function(todoDetails){
  let html=`<h1>${todoDetails.title}</h1><h2>${todoDetails.description}`;
  let items= todoDetails.item.map(function(item){
    return `<h4>* ${item.todoItem}     ${item.status}</h4>`;
  }).join('')||'';
  return html+items;
}
let convertToHtml=function(req,res){
  let userData=getUserData();
  return Object.keys(userData).map(function(name){
    app.get(`/${name}`,(req,res)=>{
      if(!currentUser){
        res.redirect('/index.html');
        return;
      }
      let todoDetails = getTODO(`${name}`);
      res.write(convertTODOtoHtml(todoDetails));
      currentTodoFile=`${name}`;
      res.write('<h3><a href="addItem.html">add</a></h3>');
      res.write('<h3><a href="home.html">Home</a></h3>');
      res.write('<h3><a href="logout.html">Logout</a></h3>');
      res.end();
    });
    return "<h4><a href="+`/${name}`+`>${name}</a></h4>`;
  }).join('')|| "";
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
  createFileForNewUser();
  res.redirect('/home.html');
});
app.get('/home.html',(req,res)=>{
  if(!req.cookies.sessionid || !currentUser){
      res.setHeader('Set-Cookie',`sessionid=0; Expires=${new Date(1).toUTCString()}`);
    res.redirect("/index.html");
    return;
  }
  let html=fs.readFileSync("./public/home.html",'utf8');
  res.setHeader('Content-Type',getContentType('/home.html'));
  res.write(`<h1>WELCOME ${currentUser.userName}</h1>`);
  let newcontent=html.replace('replacer',convertToHtml(req,res));
  res.write(newcontent);
  currentTodoFile="";
  res.end();
})
app.get('/create.html',(req,res)=>{
  if(!currentUser){
      res.setHeader('Set-Cookie',`sessionid=0; Expires=${new Date(1).toUTCString()}`);
    res.redirect("/index.html");
    return;
  }
  let content=fs.readFileSync("./public/create.html");
  res.setHeader('Content-Type',getContentType('/create.html'));
  res.write(content);
  res.end();
})
app.post('/create.html',(req,res)=>{
  let givenDetails=req.body;
  let userData=getUserData();
  let todoFile=req.body.title;
  userData[todoFile] = req.body;
  userData[todoFile].item=[];
  fs.writeFileSync(`./data/${currentUser.userName}.json`,JSON.stringify(userData));
  currentTodoFile=todoFile;
  res.redirect('/addItem.html');
});
app.get('/addItem.html',(req,res)=>{
  if(!currentUser){
      res.setHeader('Set-Cookie',`sessionid=0; Expires=${new Date(1).toUTCString()}`);
    res.redirect("/index.html");
    return;
  }
  let content=fs.readFileSync("./public/addItem.html");
  res.setHeader('Content-Type',getContentType('/addItem.html'));
  res.write(content);
  res.end();
})
app.post('/addItem.html',(req,res)=>{
  let userUpdate=req.body;
  let userData=getUserData();
  let todo=getTODO(currentTodoFile);
  todo.item.push(userUpdate);
  userData[currentTodoFile]=todo;
  console.log(userData);
  fs.writeFileSync(`./data/${currentUser.userName}.json`,JSON.stringify(userData));
  res.redirect('/home.html');
});
app.get('/logout.html',(req,res)=>{
  if(!req.cookies.sessionid){
      res.redirect('/index.html');
      return;
    }
    currentUser={};
    res.setHeader('Set-Cookie',`sessionid=0; Expires=${new Date(1).toUTCString()}`);
    res.redirect('/index.html');
});
module.exports = app;
