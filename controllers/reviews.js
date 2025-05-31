const review=require("../models/review.js");
const Listing=require("../models/listing.js");


module.exports.createReview= async (req, res) => {
 // console.log(req.params.id);
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview=async(req,res) =>{
let { id,revId }=req.params;

await Listing.findByIdAndUpdate(id,{$pull: {reviews:revId}});
await review.findByIdAndDelete(revId);
 req.flash("success","Review deleted!");
res.redirect(`/listings/${id}`);
};