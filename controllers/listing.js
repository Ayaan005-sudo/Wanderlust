const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const expressErrors=require("../utils/expressErrors.js");

const listing=require("../model/listing");

const {isLoggedIn}=require("../Middleware.js");

const {isOwner}=require("../Middleware.js");




module.exports.index=async(req,res)=>{
    let lists=await listing.find();
    
    res.render("index.ejs",{lists});

  };



  module.exports.new=(req,res)=>{
    
   res.render("new.ejs");
     };



     module.exports.postNew=async(req,res)=>{
      console.log(req.file);
      let url=req.file.path;
    
      let filename=req.file.filename;
      console.log(url,"..",filename);
 let{title,country,description,price,location,image,category}=req.body.listing;
      const listing2=new listing(req.body.listing);
        // title:title,
        // location:location,
        // price:price,
        // country:country,
        // description:description,
        // image:[{
        //   url:image,
  
        //   filename:"manual-upload.jpg"
        // }]
        listing2.owner=req.user._id;
        listing2.image={url,filename};
        
         await listing2.save();
         req.flash("success","new listing created!");
      res.redirect("/listings");
     }


     module.exports.personalId=async(req,res)=>{
    let{id}=req.params;
    let lis= await listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");

    if(!lis){
      req.flash("failure"," listing you are try to reach does not exist");
      res.redirect("/listings");
    }
    console.log(lis);
    res.render("show.ejs", {lis});
  };

  module.exports.edit=async (req,res)=>{
  let{id}=req.params;
  
  let list=await listing.findById(id); 
  if(!list){
    req.flash("failure"," listing you are try to reach does not exist");
    res.redirect("/listings");
  }
  res.render("edit.ejs",{list});
console.log(list);
};

module.exports.editPut=async(req,res)=>{
  let {id}=req.params;

 const Listing= await listing.findByIdAndUpdate(id,{...req.body.listing});
if(typeof req.file!="undefined"){
  let url=req.file.path;
      let filename=req.file.filename;
      listing.image=[{url,filename}];
      await listing.save();}
  req.flash("success"," listing updated!");
  res.redirect(`/listings/${id}`);
};
// app.post("/listings/:id/reviews" , async(req,res)=>{
//   let {id}=req.params;
//   let{reviews}=req.body;
//   await listing.findById({id});
//   const newReview= new review(req.body);
//   await listing.save();
//   await review.save();
//   console.log(DONE);
//   res.send("work done")
// })

module.exports.delete=async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findByIdAndDelete(id);
    console.log(list);
     req.flash("success"," listing deleted!");
     res.redirect("/listings");
};


module.exports.filterSearch=async(req,res)=>{
  let category=req.query.category;
 let lists=await listing.find({category:category});
 if(lists.length!==0){
res.render("filter.ejs",{lists,category}); 
  }else{
    req.flash("failure","Sorry result is not available for this category");
    res.redirect("/listings");
  }
 
 
}
