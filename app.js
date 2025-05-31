if(process.env.NODE_ENV!="production"){
require('dotenv').config();
}


console.log(process.env.SECRET);

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const { listingSchema,reviewSchema }=require("./schema.js");
const review=require("./models/review.js");
const listings=require("./routes/listing.js")
const routes=require("./routes/review.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const userRouter=require("./routes/user.js");
const  { validateReview, isLoggedIn,isReviewAuthor }=require("./middleware.js");

//create database
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(() =>{
console.log("connected to database");
}).catch((err) =>{
console.log(err);
});
async function main(){
  await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions={
  secret:"mySuperSecretCode",
  resave:false,
  saveUninitialized:true
};

/*
const validateListing=(req,res,next) =>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }
};

  const validateReview=(req,res,next) =>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else{
    next();
  }  
};*/
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
res.locals.success=req.flash("success");
res.locals.error=req.flash("error");
res.locals.currUser=req.user;
next();
});

/*app.get("demouser",async(req,res)=>{
let fakeUser=new User({
  email:"disha@gmail.com",
  username:"sigma-student",
});

let registeredUser=await User.register(fakeUser,"helloworld");
res.send(registeredUser);
});*/
app.use("/listings",listings);
app.use("/listing/:id/review",review);
app.use("/",userRouter);
// api create

app.get("/",(req,res) =>{
  res.send("Hi ,I am a root");
});


// index route
/*app.get("/listings", wrapAsync (async(req,res)=> {
  const allListings=await Listing.find({});
  res.render("listings/index", { allListings });
//res.render("../views/listings/index.ejs", {allListings});
  })
);

  //new route
  app.get("/listings/new",wrapAsync (async (req,res) => {
    
res.render("../views/listings/new");
})
); 


  // show route
  app.get("/listings/:id", wrapAsync (async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");  
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    res.render("listings/show", { listing }); 
})
);


//create route
app.post("/listings/new", validateListing,wrapAsync(async(req, res, next) => {
  /*let result=listingSchema.validate(req.body);
  console.log(result);
  if(result.error){
    throw new ExpressError(400,result.error);
  }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
   // console.error("Error saving listing:", err);
  //res.status(500).send("Server error while saving listing");
})
);

//edit route
app.get("/listings/:id/edit",wrapAsync (async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/edit", { listing });
}
));

//update route
app.put("/listings/:id",validateListing, wrapAsync (async (req,res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
})
);
// delete listing
app.delete("/listings/:id", wrapAsync (async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    return res.status(404).send("Listing not found");
  }
  console.log("Deleted:", deletedListing);
  res.redirect("/listings");
} ));*/

app.all('/{any}', (req,res,next) =>{
next(new ExpressError(404,"Page not found!"));
});

/*p.use((err,req,res,next) => {
  let{statusCode,message}=err;
 // res.status(statusCode).send(message);
res.render("../views/error.ejs", { message });
});*/
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(statusCode).render("error", { err }); // <-- Pass `err` to the view
});

app.post("/listings/:id/review" ,validateReview, wrapAsync(async(req,res) => {
let listing=await Listing.findById(req.params.id);
let newReview=new review(req.body.review);
if (!listing.reviews) {
  listing.reviews = [];
}
listing.reviews.push(newReview);

await newReview.save();
await listing.save();
res.redirect(`/listings/${listing._id}`);
})
);

app.delete("/listings/:id/review/:revId",wrapAsync(async(req,res) =>{
let { id,revId }=req.params;

await Listing.findByIdAndUpdate(id,{$pull: {review:revId}});
await review.findByIdAndDelete(revId);
res.redirect(`/listings/${id}`);
}));

app.listen(8080,()=>{
  console.log("app is listening to the port 8080");
});


