let chai = require('chai');
let assert = chai.assert;
let request = require('./testFrameWork/requestSimulator.js');
let th = require('./testFrameWork/testHelper.js');
const app = require('../todoApp.js');

describe('New app',()=>{
  describe('GET /bad',()=>{
    it('should display message as not found',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })

  describe('GET /',()=>{
    it('load login page',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,"userName");
        done();
      })
    })
  })

  describe('GET /login',()=>{
    it('load the login page for unlogged user',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,"userName");
        th.body_contains(res,"password");
        done();
      })
    })

    it('redirect logged user to home',done=>{
      request(app,{method:'GET',url:'/login',user:"rahul"},res=>{
        th.should_be_redirected_to(res,'/home');
        done();
      })
    })
  })

  describe('POST /login',()=>{
    it('redirects valid user to home',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=rahul&pass=rp123'},res=>{
        th.should_be_redirected_to(res,'/home');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })

    it('redirects inValid user to login',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=abc'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_cookie(res,'message',"login failed");
        done();
      })
    })
  })

  describe('GET /logout',()=>{
    it('should reset the cookies and redirect to the login page',(done)=>{
      request(app,
        {method:'GET',url:'/logout',user:"rahul",headers:{cookie:'sessionid=123'}},
        res=>{
        th.should_reset_cookie(res,'sessionid',0);
        th.should_not_have_cookie(res,'message');
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })

    it('should redirect to login page if no user present',(done)=>{
      request(app,{method:'GET',url:'/logout'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.should_have_cookie(res,'message',"login first");
        done();
      })
    })
  })
})
