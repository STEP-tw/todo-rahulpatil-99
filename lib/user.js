const File = require('./file.js');
const User=function(userName){
  this.userName=userName;
  this.files={};
}

User.prototype.getUserName = function () {
  return this.userName;
};

User.prototype.getAllTodo = function () {
  return Object.keys(this.files);
};

User.prototype.getTodo = function (title) {
  return this.files[title];
};

User.prototype.addTodo = function (title,description) {
  let todo=new File(title,description);
  this.files[todo.title]=todo;
};

User.prototype.deleteTodo = function (todo) {
  delete this.files[todo];
};

User.prototype.getTodoItems = function (todo) {
    let file=this.getTodo(todo);
    return file.getTodoItems();
};

User.prototype.addTodoItem = function (todo,text) {
    let file=this.getTodo(todo);
    file.addTodoItem(text);
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

User.prototype.editTodo = function (todo,newTitle,newDesc) {
    let todoItems=this.getTodoItems(todo)
    delete this.files[todo];
    this.addTodo(newTitle,newDesc);
    let file = this.files[newTitle];
    file.items=todoItems;
};

User.prototype.editTodoItem = function (todo,todoItem,newItem) {
    let file = this.getTodo(todo);
    let item = file.getTodoItem(todoItem);
    item.updateContent(newItem);
};

module.exports=User;
