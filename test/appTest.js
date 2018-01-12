let chai = require('chai');
let assert = chai.assert;
let request = require('./testFrameWork/requestSimulator.js');
let th = require('./testFrameWork/testHelper.js');
let app = require('../app.js')

describe('app',()=>{
  describe('GET /bad',()=>{
    it('redirects to index.html',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
})
