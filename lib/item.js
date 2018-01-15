const Item = function(content){
  this.content=content;
  this.status=false;
};

Item.prototype.getContent = function () {
  return this.content;
};

Item.prototype.getStatus = function () {
  return this.status;
};

Item.prototype.changeStatus = function (status) {
  this.status=status;
};

Item.prototype.setAsDone=function(){
  this.changeStatus(true);
};

Item.prototype.setAsUndone=function(){
  this.changeStatus(false);
};

Item.prototype.updateContent=function(changedData){
  this.content=changedData;
};

module.exports=Item;
