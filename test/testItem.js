let chai = require('chai');
let assert = chai.assert;
let Item=require('../lib/item.js');

describe('Item',()=>{
  describe('changeStatus',()=>{
    it('it should update the status of the given item',()=>{
      let play = new Item('play cricket');
      play.changeStatus(true);
      assert.equal(play.status,true);
    })
  })

  describe('setAsDone',()=>{
    it('it should update the status of the given item as true',()=>{
      let play = new Item('play cricket');
      play.setAsDone();
      assert.isOk(play.status);
    })
  })

  describe('setAsUndone',()=>{
    it('it should update the status of the given item as false',()=>{
      let play = new Item('play cricket');
      play.setAsUndone();
      assert.isNotOk(play.status);
    })
  })

  describe('updateContent',()=>{
    it('it should replace the content of the item',()=>{
      let play=new Item('play cricket');
      play.updateContent("play football");
      assert.equal(play.content,"play football");
    })
  })
})
