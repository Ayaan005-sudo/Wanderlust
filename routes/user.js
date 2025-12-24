const express=require("express");
const router=express.Router();
const User =require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const expressErrors=require("../utils/expressErrors.js");
const {saveRedirectUrl}=require("../Middleware.js")

const UserController=require("../controllers/user.js");

router.route("/signup")
.get((req,res)=>{
res.render("users/signup.ejs");
})
.post( wrapAsync(UserController.signUp));



router.route("/login")
.get((UserController.login))
.post( saveRedirectUrl,(UserController.PostLogin)); 


router.get("/logout",(UserController.Logout));
 

router.get("/search",wrapAsync(UserController.search));




module.exports=router;