const chai = require('chai');
const assert = chai.assert;
const Item=require('../lib/item.js');

describe('Item',()=>{
  describe('getContent',()=>{
    it('should give content of the item',()=>{
      let play = new Item('play cricket');
      let expected=play.getContent();
      assert.equal("play cricket",expected);
    })
  })

  describe('getStatus',()=>{
    it('should give status of the item',()=>{
      let play = new Item('play cricket');
      let expected=play.getStatus();
      assert.equal(false,expected);
    })
  })

  describe('changeStatus',()=>{
    it('should update the status of the item',()=>{
      let play = new Item('play cricket');
      play.changeStatus(true);
      assert.isOk(play.getStatus());
    })
  })

  describe('setAsDone',()=>{
    it('should update the status of the item as true',()=>{
      let play = new Item('play cricket');
      play.setAsDone();
      assert.isOk(play.getStatus());
    })
  })

  describe('setAsUndone',()=>{
    it('should update the status of the item as false',()=>{
      let play = new Item('play cricket');
      play.setAsUndone();
      assert.isNotOk(play.getStatus());
    })
  })

  describe('updateContent',()=>{
    it('should replace the content of the item',()=>{
      let play=new Item('play cricket');
      play.updateContent("play football");
      assert.equal(play.getContent(),"play football");
    })
  })
})
