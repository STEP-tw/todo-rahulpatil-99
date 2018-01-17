const chai = require('chai');
const assert = chai.assert;
const User = require('../lib/user.js');
const Admin = require('../lib/admin.js');

describe('todo',()=>{

  describe('getUser',()=>{
    it("should give the required user",()=>{
      let userHandler = new Admin();
      let rahul = new User("Rahul");
      userHandler.addUser("Rahul");
      assert.deepEqual(userHandler.getUser("Rahul"),rahul);
    })
  })

  describe('getAllUser',()=>{
    it("should give name of all users",()=>{
      let userHandler = new Admin();
      userHandler.addUser("Rahul");
      userHandler.addUser("Vijay");
      assert.deepEqual(userHandler.getAllUser(),["Rahul","Vijay"]);
    })
  })

  describe('addUser',()=>{
    it("should add new user in user list",()=>{
      let userHandler = new Admin();
      let rahul = new User("Rahul");
      userHandler.addUser("Rahul");
      assert.deepEqual(userHandler.getUser("Rahul"),rahul);
    })
  })

  describe('deleteUser',()=>{
    it("should delete user from user list",()=>{
      let userHandler = new Admin();
      userHandler.addUser("Rahul");
      userHandler.addUser("Vishal");
      userHandler.deleteUser("Vishal");
      assert.deepEqual(userHandler.getAllUser(),["Rahul"]);
    })
  })
})
