class validationHandler {
  constructor() {
    this.users=[{userName:"rahul", pass:"rp123"},
                {userName:"raghav", pass:"rg234"}];
  }
  getUser(user){
    return this.users.find(u=>u.userName==user.userName && u.pass==user.pass);
  }
  redirectToLogin(res){
    res.setHeader("Set-Cookie","message=login failed")
    res.redirect("/login");
    return;
  }
  execute(req,res){
    let user=this.getUser(req.body);
    if(!user){
      this.redirectToLogin(res);
      return;
    }
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    user.sessionid = sessionid;
    res.redirect('/home');
  }
  requestHandler(){
    return this.execute.bind(this);
  }
}

module.exports=validationHandler;
