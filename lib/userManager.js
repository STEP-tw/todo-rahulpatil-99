const User = require('./user.js');
const userManager = function() {
  this.users={};
}

userManager.prototype.getUser = function (userName) {
  return this.users[userName];
};

userManager.prototype.getAllUser = function () {
  return Object.keys(this.users);
};

userManager.prototype.addUser = function (name) {
  let user = new User(name);
  this.users[name] = user;
  return user;
};

userManager.prototype.deleteUser = function (name) {
  delete this.users[name];
};

module.exports=userManager;
