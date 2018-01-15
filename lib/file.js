const Item = require('./item.js');
const File = function(title,desc,items=[]) {
  this.title=title;
  this.description=desc;
  this.items=items;
};

File.prototype.getTitle = function () {
  return this.title;
};

File.prototype.getDescription = function () {
  return this.description;
};

File.prototype.updateTitle = function (title) {
  this.title=title;
};

File.prototype.updateDescription = function (description) {
  this.description=description;
};

File.prototype.getTodoItems = function () {
  return this.items;
};

File.prototype.getTodoItem = function (todoItem) {
  return this.items.find(u=>u.content==todoItem);
};

File.prototype.addTodoItem = function (text) {
  this.items.push(new Item(text));
};

File.prototype.deleteTodoItem = function (content) {
  this.items= this.items.filter(function(todoItem){
      return todoItem.content!=content;
    })
};

module.exports=File;
