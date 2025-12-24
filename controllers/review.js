const express=require("express");
const router=express.Router({mergeParams:true});
const review =require("../model/review");
const wrapAsync=require("../utils/wrapAsync.js");
const expressErrors=require("../utils/expressErrors.js");
const listing=require("../model/listing");
const{reviewSchema}=require("../schema.js");
const {listingSchema}=require("../schema.js");

const {isLoggedIn,isAuthor}=require("../Middleware.js");




module.exports.postReview=async (req, res) => {
  const { id } = req.params;
 
  const foundListing = await listing.findById(id);
  const newReview = new review(req.body.review);
newReview.author=req.user._id;
  foundListing.reviews.push(newReview)
  
  await newReview.save();
  await foundListing.save();
  console.log(req.body.review);
req.flash("success","new Review created!");
  console.log("DONE");
  res.redirect(`/listings/${id}`);
}


module.exports.delete=async(req,res)=>{
  let{id,reviewId}=req.params;
  
  await review.findByIdAndDelete(reviewId);
  await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  req.flash("failure","review deleted!");
res.redirect(`/listings/${id}`)
}