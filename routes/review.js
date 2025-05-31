const express=require("express");
const router=express.Router({mergeParams:true}) ;
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const { listingSchema,reviewSchema }=require("../schema.js");
const review=require("../models/review.js");
const  { validateReview,isLoggedIn,isReviewAuthor }=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

router.post("/:id", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

router.delete("/:revId",wrapAsync(reviewController.destroyReview));

module.exports=router;