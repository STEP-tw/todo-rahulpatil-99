const chai = require('chai');
const assert = chai.assert;
const Item = require('../lib/item.js');
const File=require('../lib/file.js');

describe('File',()=>{
  describe('getTitle',()=>{
    it('should give the title of the file',()=>{
      let sample = new File('sample',"sample test");
      assert.equal(sample.getTitle(),"sample");
    })
  })

  describe('getDescription',()=>{
    it('should give the description of the file',()=>{
      let sample = new File('sample',"sample test");
      assert.equal(sample.getDescription(),"sample test");
    })
  })

  describe('updateTitle',()=>{
    it('should update the title of the file',()=>{
      let sample = new File('sample',"sample test");
      sample.updateTitle("testing");
      assert.equal(sample.title,"testing");
    })
  })

  describe('updateDescription',()=>{
    it('should update the description of the file',()=>{
      let sample = new File('sample',"sample test");
      sample.updateDescription("practice file");
      assert.equal(sample.getDescription(),"practice file");
    })
  })

  describe('getTodoItems',()=>{
    it('should give the todo items in the file',()=>{
      let sample = new File('sample',"sample test");
      assert.deepEqual(sample.getTodoItems(),[]);
    })
  })

  describe('getTodoItem',()=>{
    it('should give required todo item in the file',()=>{
      let sample = new File('sample',"sample test");
      sample.addTodoItem("write test");
      sample.addTodoItem("play cricket");
      assert.deepEqual(sample.getTodoItem("play cricket"),new Item("play cricket"));
    })
  })

  describe('addTodoItem',()=>{
    it('should add todo item in item list',()=>{
      let sample = new File('sample',"sample test");
      let item = new Item("write test");
      sample.addTodoItem("write test");
      assert.deepEqual(sample.getTodoItems(),[item]);
    })
  })

  describe('deleteTodoItem',()=>{
    it('should delete todo item from item list',()=>{
      let sample = new File('sample',"sample test");
      let item = new Item("write plan");
      sample.addTodoItem("write plan");
      sample.addTodoItem("write test");
      sample.deleteTodoItem("write test");
      assert.deepEqual(sample.getTodoItems(),[item])
    })
  })
});
