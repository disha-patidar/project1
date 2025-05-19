const mongoose=require("mongoose");
const Schema=mongoose.Schema;
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
  }
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;