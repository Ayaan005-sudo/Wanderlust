if(process.env.NODE_ENV!="production"){
require('dotenv').config();}



//express require
const express=require("express")
const app=express();
const listing=require("./model/listing");
const review =require("./model/review");
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const expressErrors=require("./utils/expressErrors.js");
const {listingSchema}=require("./schema.js");
const{reviewSchema}=require("./schema.js");
const session=require("express-session");
const  MongoStore=require("connect-mongo");

const flash=require("connect-flash");
const passport=require("passport");
const LocalStratergy=require("passport-local");
const User=require("./model/user.js");

const listings=require("./routes/listing.js");
const reviews =require("./routes/review.js");
const userRouter =require("./routes/user.js");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


//ejs require
app.set("view engine","ejs");

const path=require("path");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
//mongoose require
const mongoose = require('mongoose');

main()
.then(()=>{console.log("connection successfully")})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.PASSWORD_MONGOATLAS)}

  //post dataparse
  app.use(express.urlencoded({extended:true}));
  app.use(express.json());

  // main work start
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`app is listening on ${port}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} already in use — kill it with 'npx kill-port ${port}' or set PORT to another value.`);
      process.exit(1);
    }
    throw err;
  });

  const store1= MongoStore.create({
    mongoUrl:process.env.PASSWORD_MONGOATLAS,
    touchAfter:24*3600,
  });

  store1.on("error",(err)=>{
    console.log("error in mongo session store",err);
  })

const sessionOptions={
store:store1,
secret:process.env.SECRET,
resave:false,
saveUninitialized:false,
cookie:{
  expires:new Date(Date.now()+7*24*60*60*1000),
  maxAge:7*24*60*60*1000,
  httpOnly:true,
}
};


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.failure=req.flash("failure");
  res.locals.currUser=req.user;
  next();
});
 


  app.get("/demouser",async(req,res)=>{
    let fakeuser=new User({
      email:"student1334@gmail.com",
      username:"manuugambla-student"//username hamne schemaa mai nahi daale fir bhi yaha daal paa rahe hai just becouse of passport

    });
    let registerUser= await User.register(fakeuser,"helloworld")//here helloworld is the password
    res.send(registerUser)
    console.log(registerUser);
  })
   app.use("/listings",listings);
  app.use("/listings/:id/reviews" ,reviews);
  app.use("/",userRouter);


const validateListing=(req,res,next)=>{
let {error}=listingSchema.validate(req.body);
      
      if(error){
        throw new expressErrors(404,error);
      }else{
        next();
      }
}

const validateReview=(req,res,next)=>{
let {error}=reviewSchema.validate(req.body);
      
      if(error){
        throw new expressErrors(404,error);
      }else{
        next();
      }
}






 




app.all("*",(req,res,next)=>{
  next(new expressErrors(404,"page not found"))
})

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  if (res.headersSent) {
    return next(err); 
  }

  res.status(status).render("error.ejs", { message });
});


// app.use((err,req,res,next)=> {
//   let{status=500,message="something went wrong"}=err;
//   // res.status(status).send(message);
//   res.render("error.ejs",{message});
// });


