const chai = require('chai');
const assert = chai.assert;
const User = require('../lib/user.js');
const UserHandler = require('../lib/userHandler.js');

describe('userHandler',()=>{

  describe('getUser',()=>{
    it("should give the required user",()=>{
      let userHandler = new UserHandler();
      let rahul = new User("Rahul");
      userHandler.addUser(rahul);
      assert.deepEqual(userHandler.getUser("Rahul"),rahul);
    })
  })

  describe('getAllUser',()=>{
    it("should give name of all users",()=>{
      let userHandler = new UserHandler();
      let rahul = new User("Rahul");
      let vijay = new User("Vijay");
      userHandler.addUser(rahul);
      userHandler.addUser(vijay);
      assert.deepEqual(userHandler.getAllUser(),["Rahul","Vijay"]);
    })
  })

  describe('addUser',()=>{
    it("should add new user in user list",()=>{
      let userHandler = new UserHandler();
      let rahul = new User("Rahul");
      userHandler.addUser(rahul);
      assert.deepEqual(userHandler.getUser("Rahul"),rahul);
    })
  })

  describe('deleteUser',()=>{
    it("should delete user from user list",()=>{
      let userHandler = new UserHandler();
      let rahul = new User("Rahul");
      let vishal = new User("Vishal");
      userHandler.addUser(rahul);
      userHandler.addUser(vishal);
      userHandler.deleteUser(vishal);
      assert.deepEqual(userHandler.getAllUser(),["Rahul"]);
    })
  })
})
