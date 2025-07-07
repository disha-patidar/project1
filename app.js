if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const review = require("./models/review.js");
const listings = require("./routes/listing.js");
const routes = require("./routes/review.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("./middleware.js");

//create database
const dbURL = process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbURL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", () => {
  console.log("error on mongo store", err);
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listings);
app.use("/listing/:id/review", review);
app.use("/", userRouter);

app.all("/{any}", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(statusCode).render("error", { err }); // <-- Pass `err` to the view
});
app.get("/", (req, res) => {
  res.send("YelpCamp is live!");
});
app.post(
  "/listings/:id/review",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    if (!listing.reviews) {
      listing.reviews = [];
    }
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
  })
);

app.delete(
  "/listings/:id/review/:revId",
  wrapAsync(async (req, res) => {
    let { id, revId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { review: revId } });
    await review.findByIdAndDelete(revId);
    res.redirect(`/listings/${id}`);
  })
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

//mongodb+srv://project1:999999999@cluster0.kwtycrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
