const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");

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


// api create

app.get("/",(req,res) =>{
  res.send("Hi ,I am a root");
});


// index route
app.get("/listings", async(req,res)=> {
  const allListings=await Listing.find({});
res.render("../views/listings/index.ejs", {allListings});
  });

  //new route
  app.get("/listings/new",async (req,res) => {
    
res.render("../views/listings/new");
}); 


  // show route
  app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);  
    if (!listing) {
        return res.status(404).send("Listing not found");
    }
    res.render("listings/show", { listing }); 
});


//create route
app.post("/listings/new", async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    console.error("Error saving listing:", err);
    res.status(500).send("Server error while saving listing");
  }
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/edit", { listing });
});

//update route
app.put("/listings/:id", async (req,res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
});
// delete listing
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    return res.status(404).send("Listing not found");
  }
  console.log("Deleted:", deletedListing);
  res.redirect("/listings");
});

app.listen(8080,()=>{
  console.log("app is listening to the port 8080");
});




































/*app.get("/testListing",async(req,res) => {
let sampleListing=new Listing({
  title:"My New Villa",
  description: "By the Beach",
  price:1200,
  location:"Calangute,Goa",
  country:"India",
});
await sampleListing.save();
console.log("Sample was saved");
res.send("successful testing");
});*/