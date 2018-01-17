const Task = function(content,status=false){
  this.content=content;
  this.status=status;
};

Task.prototype.getContent = function () {
  return this.content;
};

Task.prototype.getStatus = function () {
  return this.status;
};

Task.prototype.changeStatus = function (status) {
  this.status=status;
};

Task.prototype.setAsDone=function(){
  this.changeStatus(true);
};

Task.prototype.setAsUndone=function(){
  this.changeStatus(false);
};

Task.prototype.updateContent=function(changedData){
  this.content=changedData;
};

module.exports=Task;
