const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const expressErrors=require("../utils/expressErrors.js");
const listing=require("../model/listing");
const {isLoggedIn}=require("../Middleware.js");

const {isOwner}=require("../Middleware.js");
const ListingController=require("../controllers/listing.js")

const multer  = require('multer')
const{storage}=require("../cloudConfig.js");
const upload = multer({ storage });

//testing check
  router.get("/testlisting", wrapAsync(async (req,res)=>{
    const listing1=new listing({
      title:"maldive",
      description:"a beati place",
      price:1200,
      
      loaction:"near my home",
      country:"lanka"
    })
    await listing1.save();
    console.log("sample save")
    res.send("working");
  }))


//validatelisting
const validateListing=(req,res,next)=>{
let {error}=listingSchema.validate(req.body);
      
      if(error){
        throw new expressErrors(404,error);
      }else{
        next();
      }
}

router.route("/")
.get(wrapAsync(ListingController.index))
.post(isLoggedIn, upload.single("listing[image]"),validateListing,wrapAsync (ListingController.postNew))

//new listing form route
  router.get("/new", isLoggedIn,ListingController.new);

  router.get("/filter",isLoggedIn,wrapAsync(ListingController.filterSearch));

router.route("/:id")
   .get(wrapAsync(ListingController.personalId)) 
.put(isLoggedIn,isOwner,upload.single("listing[image]"), validateListing, wrapAsync(ListingController.editPut))
 .delete(isLoggedIn,isOwner,wrapAsync(ListingController.delete));

  //id edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.edit));


 

module.exports=router;