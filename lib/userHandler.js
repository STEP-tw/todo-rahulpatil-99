const UserHandler = function() {
  this.users={};
}

UserHandler.prototype.getUser = function (userName) {
    return this.users[userName];
};

UserHandler.prototype.getAllUser = function () {
    return Object.keys(this.users);
};

UserHandler.prototype.addUser = function (user) {
  this.users[user.userName] = user;
};

UserHandler.prototype.deleteUser = function (user) {
  delete this.users[user.userName];
};

module.exports=UserHandler;
