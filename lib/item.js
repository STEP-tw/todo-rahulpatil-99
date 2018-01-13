const Item = function(content){
  this.content=content;
  this.status=false;
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
