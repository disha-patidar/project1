const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

// index route
router.get("/", wrapAsync(listingController.index));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show route
router.get("/:id", wrapAsync(listingController.showListings));
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);
/*router.post("/" ,upload.single('listing[image]'),(req,res)=>{
res.send(req.file);
});*/
//create route
router.post("/", validateListing, wrapAsync(listingController.createListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  wrapAsync(listingController.renderEditForm)
);

//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
);
// delete listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    req.flash("error", "Search term missing!");
    return res.redirect("/listings");
  }

  const regex = new RegExp(q, "i");

  const listings = await Listing.find({
    $or: [{ title: regex }, { location: regex }, { country: regex }],
  });

  res.render("listings/index", { allListings: listings });
});
module.exports = router;
