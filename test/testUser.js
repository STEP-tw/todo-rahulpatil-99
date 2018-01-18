const chai = require('chai');
const assert = chai.assert;
const Todo = require('../lib/todo.js');
const Task = require('../lib/task.js');
const User = require('../lib/user.js');

describe('User',()=>{
  describe('getUserName',()=>{
    it('should give the user name',()=>{
      let rahul = new User('rahulp');
      assert.equal(rahul.getUserName(),'rahulp');
    })
  })

  describe('getAllId',()=>{
    it('should give all todo id',()=>{
      let rahul = new User('rahulp');
      assert.deepEqual(rahul.getAllId(),[]);
    })
  })

  describe('getId',()=>{
    it('should give id of todo',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample file")
      assert.equal(rahul.getId("sample"),1);
    })
  })

  describe('getTodo',()=>{
    it('should give the specific todo',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      rahul.addTodo("test","sample todo test");
      assert.deepEqual(rahul.getTodo("sample"),new Todo("sample","sample test",1));
    })
  })

  describe('addTodo',()=>{
    it('should add todo',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      assert.deepEqual(rahul.getAllTitle(),['sample']);
    })
  })

  describe('deleteTodo',()=>{
    it('should delete todo',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      rahul.addTodo("test","sample todo test");
      rahul.deleteTodo("sample");
      assert.deepEqual(rahul.getAllTitle(),['test']);
    })
  })

  describe('getTodoItems',()=>{
    it('should give all item in file',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      rahul.addTodoItem("sample","test add function");
      let todoItem = new Task("test add function");
      assert.deepEqual(rahul.getTodoItems("sample"),[todoItem]);
    })
  })

  describe('addTodoItem',()=>{
    it('should add item in file',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      rahul.addTodoItem("sample","test add function");
      let todoItem = new Task("test add function");
      assert.deepEqual(rahul.getTodoItems("sample"),[todoItem]);
    })
  })

  describe('deleteTodoItem',()=>{
    it('should delete item in file',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      rahul.addTodoItem("sample","test add function");
      rahul.addTodoItem("sample","prepare for test");
      rahul.deleteTodoItem("sample","prepare for test")
      let todoItem = new Task("test add function");
      assert.deepEqual(rahul.getTodoItems("sample"),[todoItem]);
    })
  })

  describe('markAsDone',()=>{
    it('should set status of given todo item to true',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      rahul.addTodoItem("sample","test add function");
      rahul.markAsDone("sample","test add function");
      let todoItem = new Task("test add function",true);
      assert.deepEqual(rahul.getTodoItems("sample"),[todoItem]);
    })
  })

  describe('markAsNotDone',()=>{
    it('should set status of given todo item to false',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      rahul.addTodoItem("sample","test add function",true);
      rahul.markAsNotDone("sample","test add function");
      let todoItem = new Task("test add function");
      assert.deepEqual(rahul.getTodoItems("sample"),[todoItem]);
    })
  })

  describe('editTodo',()=>{
    it('should change the title and description of the todo',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      rahul.addTodoItem("sample","write essay");
      rahul.editTodo("sample","practice","practice file");
      let todoItem =new Task("write essay");
      let practice = new Todo("practice","practice file",1,[todoItem]);
      assert.deepEqual(rahul.getAllTitle(),["practice"]);
      assert.deepEqual(rahul.getTodo("practice"),practice);
    })
  })

  describe('editTodoItem',()=>{
    it('should change the content of todo item',()=>{
      let rahul = new User('rahulp');
      rahul.addTodo("sample","sample test");
      rahul.addTodoItem("sample","write essay");
      rahul.editTodoItem("sample","write essay","write test");
      let todoItem =new Task("write test");
      let sample = new Todo("sample","sample test",1,[todoItem]);
      assert.deepEqual(rahul.getTodo("sample"),sample)
    })
  })
})
