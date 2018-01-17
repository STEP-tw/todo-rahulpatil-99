let chai = require('chai');
let assert = chai.assert;
let request = require('./testFrameWork/requestSimulator.js');
let th = require('./testFrameWork/testHelper.js');
let app = require('../app.js')

describe('app',()=>{
  describe('GET /bad',()=>{
    it('should give not found message',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })

  describe('GET /',()=>{
    it('redirects to login.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,"userName");
        done();
      })
    })
  })

  describe('GET /login.html',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/login.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,"userName");
        th.body_contains(res,"password");
        done();
      })
    })
  })

  describe('POST /login.html',()=>{
    it('redirects to home for valid user',done=>{
      request(app,{method:'POST',url:'/login.html',body:'userName=rahul'},res=>{
        th.should_be_redirected_to(res,'/home.html');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })

    it('redirects to login for inValid user',done=>{
      request(app,{method:'POST',url:'/login.html',body:'userName=abc'},res=>{
        th.should_be_redirected_to(res,'/login.html');
        th.should_have_expiring_cookie(res,'message',"login failed");
        done();
      })
    })
  })

  describe('GET /create.html',()=>{
    it('gives the create todo page',done=>{
      request(app,{method:'GET',url:'/create.html',body:'userName=rahul'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,"title");
        th.body_contains(res,"description");
        done();
      })
    })
  })
})
