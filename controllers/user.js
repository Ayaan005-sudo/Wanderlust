
const express=require("express");
const router=express.Router();
const User =require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const expressErrors=require("../utils/expressErrors.js");
const {saveRedirectUrl}=require("../Middleware.js")

const listing=require("../model/listing");
module.exports.signUp=async(req,res,next)=>{
   try{
let{username,email,password}=req.body;
    const user1=new User(req.body);
   let registerUser= await User.register(user1,password);
   req.login(registerUser,(err)=>{
    if(err){
      return next(err);
    }
    console.log('session after signup login:', req.session);
    req.flash("success","Your account has been successfully created");
   res.redirect("/listings");
   })
   
   } catch(e){
    req.flash("failure" ,e.message);
    res.redirect("/signup")
   }; 
   
}


module.exports.login=async(req,res)=>{
res.render("users/login.ejs");
};


module.exports.PostLogin=async (req, res, next) => {
  passport.authenticate("local", async (err, username, info) => {
    if (err) {
      return next(err);
    }
    if (!username) {
      req.flash("failure", "Invalid username or password!");
      return res.redirect("/login");
    }
    req.logIn(username, (err) => {
      if (err){ return next(err);}
      console.log('session after login:', req.session);
      req.flash("success", "Welcome back!");
      let redirectUrl=res.locals.redirectUrl||"/listings"
      return res.redirect(redirectUrl);
    });
  })(req, res, next);
}


module.exports.Logout=async(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","you are logged out");
    res.redirect("/listings");
  });
};


module.exports.search=async(req,res)=>{
  const keyword=req.query.country;
  if(keyword){
  let lists=await listing.find({
    $or:[
{location:{$regex:keyword,$options:'i'}},
{country:{$regex:keyword,$options:'i'}},
{title:{$regex:keyword,$options:'i'}}


    ]
  });
  if(lists.length!==0){
res.render("users/search.ejs",{lists,keyword}); 
  }else{
    req.flash("failure","Sorry list of this country is not available");
    res.redirect("/listings");
  }
}
else{
  req.flash("failure","enter a key word");
  res.redirect("/listings");
}




}