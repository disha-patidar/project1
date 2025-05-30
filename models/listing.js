const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const review=require("./review.js");
const listingSchema=new Schema({
    title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
  },
  image:{
    type:String,
    default:"models/photo-1599302592205-d7d683c83eea.jpg",
   set:(v) => v==="" ? "models/photo-1599302592205-d7d683c83eea.jpg":v,
  },
  price:{
    type:Number,
  },
  country:{
    type:String,
  },
  location:{
    type:String,
  },
  reviews:
    [ {
      type:Schema.Types.ObjectId,
      ref:"Review",
    },
],
owner:{
  type:Schema.Types.ObjectId,
  ref:"User",
},
});
listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
await review.deleteMany({_id: {$in:listing.reviews}});
  }
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;