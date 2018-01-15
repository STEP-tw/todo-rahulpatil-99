const chai = require('chai');
const assert = chai.assert;
const User = require('../lib/user.js');

describe('User',()=>{
  describe('getUserName',()=>{
    it('should give the user name',()=>{
      let rahul = new User('rahulp');
      assert.equal(rahul.getUserName(),'rahulp');
    })
  })

  describe('getAllFiles',()=>{
    it('should give all the files',()=>{
      let rahul = new User('rahulp');
      assert.deepEqual(rahul.getAllFiles(),[]);
    })
  })

  describe('getFile',()=>{
    it('should give the specific file',()=>{
      let rahul = new User('rahulp');
      let file={title:"sample",description:"sample test",items:["read","play"]};
      let file1={title:"test",description:"sample todo",items:["prepare"]};
      rahul.addFile(file);
      rahul.addFile(file1);
      assert.deepEqual(rahul.getFile("test"),file1);
    })
  })

  describe('addFile',()=>{
    it('should add file',()=>{
      let rahul = new User('rahulp');
      let file={title:"sample",description:"sample test",items:["read","play"]};
      rahul.addFile(file);
      assert.deepEqual(rahul.getAllFiles(),[file]);
    })
  })

  describe('deleteFile',()=>{
    it('should delete file',()=>{
      let rahul = new User('rahulp');
      let file={title:"sample",description:"sample test",items:["read","play"]};
      let file1={title:"test",description:"sample todo",items:["prepare"]};
      rahul.addFile(file);
      rahul.addFile(file1);
      rahul.deleteFile("sample");
      assert.deepEqual(rahul.getAllFiles(),[file1]);
    })
  })
})
