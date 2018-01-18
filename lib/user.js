const Todo = require('./todo.js');
const User=function(userName){
  this.userName=userName;
  this.files={};
  this.id=0;
}

User.prototype.getUserName = function () {
  return this.userName;
};

User.prototype.getAllId = function () {
  return Object.keys(this.files);
};

User.prototype.getAllTitle = function(){
  return this.getAllId().map((id)=>{
    return this.files[id].title;
  })
}

User.prototype.getId = function (title) {
  return Object.keys(this.files).find((todo)=>{
    return this.files[todo].title==title;
  });
};

User.prototype.getTodo = function (title) {
  let id = this.getId(title);
  return this.files[id];
};

User.prototype.addTodo = function (title,description) {
  this.id++;
  let todo=new Todo(title,description,this.id);
  this.files[this.id]=todo;
};

User.prototype.deleteTodo = function (title) {
  let id=this.getId(title);
  delete this.files[id];
};

User.prototype.getTodoItems = function (todo) {
    let file=this.getTodo(todo);
    return file.getTodoItems();
};

User.prototype.addTodoItem = function (todo,text,status) {
    let file=this.getTodo(todo);
    file.addTodoItem(text,status);
};

User.prototype.deleteTodoItem = function (todo,text) {
    let file=this.getTodo(todo);
    file.deleteTodoItem(text);
};

User.prototype.markAsDone = function (todo,todoItem) {
    let file=this.getTodo(todo);
    file.getTodoItem(todoItem).setAsDone();
};

User.prototype.markAsNotDone = function (todo,todoItem) {
    let file = this.getTodo(todo);
    let item = file.getTodoItem(todoItem);
    item.setAsUndone();
};

User.prototype.editTodo = function (title,newTitle,newDesc) {
    let id = this.getId(title);
    this.files[id].title=newTitle;
    this.files[id].description=newDesc;
};

User.prototype.editTodoItem = function (todo,todoItem,newItem) {
    let file = this.getTodo(todo);
    let item = file.getTodoItem(todoItem);
    item.updateContent(newItem);
};

module.exports=User;
