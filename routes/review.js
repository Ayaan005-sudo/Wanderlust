const express=require("express");
const router=express.Router({mergeParams:true});
const review =require("../model/review");
const wrapAsync=require("../utils/wrapAsync.js");
const expressErrors=require("../utils/expressErrors.js");
const listing=require("../model/listing");
const{reviewSchema}=require("../schema.js");
const {listingSchema}=require("../schema.js");

const {isLoggedIn,isAuthor}=require("../Middleware.js");
const ReviewController=require("../controllers/review.js");



const validateReview=(req,res,next)=>{
let {error}=reviewSchema.validate(req.body);
      
      if(error){
        throw new expressErrors(404,error);
      }else{
        next();
      }
}

router.post("/",isLoggedIn,validateReview,wrapAsync( ReviewController.postReview));

router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(ReviewController.delete));

module.exports=router;