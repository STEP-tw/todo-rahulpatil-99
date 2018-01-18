const Task = require('./task.js');
const Todo = function(title,desc,id,items=[]) {
  this.title=title;
  this.description=desc;
  this.id=id;
  this.items=items;
};

Todo.prototype.getTitle = function () {
  return this.title;
};

Todo.prototype.getDescription = function () {
  return this.description;
};

Todo.prototype.updateTitle = function (title) {
  this.title=title;
};

Todo.prototype.updateDescription = function (description) {
  this.description=description;
};

Todo.prototype.getTodoItems = function () {
  return this.items;
};

Todo.prototype.getTodoItem = function (todoItem) {
  return this.items.find(u=>u.content==todoItem);
};

Todo.prototype.addTodoItem = function (text,status) {
  this.items.push(new Task(text,status));
};

Todo.prototype.deleteTodoItem = function (content) {
  this.items= this.items.filter(function(todoItem){
      return todoItem.content!=content;
    })
};

module.exports=Todo;
