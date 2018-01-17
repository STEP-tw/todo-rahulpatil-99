const User = require('./user.js');
const Admin = function() {
  this.users={};
}

Admin.prototype.getUser = function (userName) {
  return this.users[userName];
};

Admin.prototype.getAllUser = function () {
  return Object.keys(this.users);
};

Admin.prototype.addUser = function (name) {
  let user = new User(name);
  this.users[name] = user;
};

Admin.prototype.deleteUser = function (name) {
  delete this.users[name];
};

module.exports=Admin;
