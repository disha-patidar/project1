const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const { listingSchema,reviewSchema }=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing }=require("../middleware.js");
const listingController=require("../controllers/listings.js");

// index route
router.get("/", wrapAsync(listingController.index));

  //new route
  router.get("/new",isLoggedIn,wrapAsync (async (req,res) => {
res.render("../views/listings/new");
})
); 


  // show route
  router.get("/:id", wrapAsync (async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author", // Populates the author field in each review
        model: "User",
      },
    }).populate("owner");
    //const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");  
    if (!listing) {
        return res.status(404).send("Listing not found");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing }); 
})
);


//create route
router.post("/new", validateListing,wrapAsync(async(req, res, next) => {
  /*let result=listingSchema.validate(req.body);
  console.log(result);
  if(result.error){
    throw new ExpressError(400,result.error);
  }*/
    const newListing = new Listing(req.body.listing);
  //  console.log(req.user);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
   // console.error("Error saving listing:", err);
  //res.status(500).send("Server error while saving listing");
})
);

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync (async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).send("Listing not found");
  }
  res.render("listings/edit", { listing });
}
));

//update route
router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync (async (req,res) => {
  let { id } = req.params;
//let listing=await Listing.findById(id);
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
})
);
// delete listing
router.delete("/:id",isLoggedIn,isOwner, wrapAsync (async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    return res.status(404).send("Listing not found");
  }
  console.log("Deleted:", deletedListing);
   req.flash("success","Listing Deleted!");
  res.redirect("/listings");
} ));

module.exports=router;