const File = function(title,desc) {
  this.title=title;
  this.description=desc;
  this.items=[];
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

File.prototype.addTodoItem = function (item) {
  this.items.push(item);
};

File.prototype.getTodoItems = function () {
  return this.items;
};

File.prototype.deleteTodoItem = function (content) {
  this.items= this.items.filter(function(todoItem){
      return todoItem.content!=content;
    })
};

module.exports=File;
