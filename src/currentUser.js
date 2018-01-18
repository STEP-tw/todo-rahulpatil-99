const UserManager = require('../lib/userManager.js');
class CurrentUser{
  constructor() {
    this.currentUser=undefined;
  }
  storeUser(name){
    let manager=new UserManager()
    manager.addUser(name);
    this.currentUser=manager.getUser(name);
  }
  getAllTitle(){
    return this.currentUser.getAllTitle();
  }
  addTodo(input){
    this.currentUser.addTodo(input.title,input.desc);
    this.currentUser.addTodoItem(input.title,input.task);
  }
  getTodo(file){
    return this.currentUser.getTodo(file);
  }
}
module.exports=CurrentUser;
