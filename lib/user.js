const User=function(userName){
  this.userName=userName;
  this.files=[];
}

User.prototype.getUserName = function () {
  return this.userName;
};

User.prototype.getAllFiles = function () {
  return this.files;
};

User.prototype.getFile = function (file) {
  return this.files.find(todo=> todo.title==file);
};

User.prototype.addFile = function (file) {
  this.files.push(file);
};

User.prototype.deleteFile = function (file) {
  this.files=this.files.filter((todo)=>{
    return todo.title!=file;
  });
};

module.exports=User;
