const chai = require('chai');
const assert = chai.assert;
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
      let item1={content:"write plan", status:false};
      let item2={content:"write test", status:false};
      sample.addTodoItem(item1);
      sample.addTodoItem(item2);
      assert.deepEqual(sample.getTodoItems(),[item1,item2]);
    })
  })

  describe('addTodoItem',()=>{
    it('should add todo item in item list',()=>{
      let sample = new File('sample',"sample test");
      let item={content:"write test", status:false};
      sample.addTodoItem(item);
      assert.deepOwnInclude(sample.getTodoItems(),item);
    })
  })

  describe('deleteTodoItem',()=>{
    it('should delete todo item from item list',()=>{
      let sample = new File('sample',"sample test");
      let item1={content:"write plan", status:false};
      let item2={content:"write test", status:false};
      sample.addTodoItem(item1);
      sample.addTodoItem(item2);
      sample.deleteTodoItem("write test");
      assert.deepEqual(sample.getTodoItems(),[item1])
    })
  })
});
