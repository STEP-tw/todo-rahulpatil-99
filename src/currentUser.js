const UserManager = require('../lib/userManager.js');
class CurrentUser{
  constructor() {
    this.currentUser=undefined;
  }
  storeUser(name){
    let manager=new UserManager();
    manager.addUser(name);
    this.currentUser=manager.getUser(name);
  }
  getAllTitle(){
    return this.currentUser.getAllTitle();
  }
  addTodo(title,description,task){
    this.currentUser.addTodo(title,description);
    this.currentUser.addTodoItem(title,task);
  }
  getTodo(file){
    return this.currentUser.getTodo(file);
  }
  addTodoItem(todo,task,status){
    this.currentUser.addTodoItem(todo,task,status);
  }
}
module.exports=CurrentUser;
