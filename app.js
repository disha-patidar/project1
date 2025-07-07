if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("[ENV] SECRET:", process.env.SECRET ? "Loaded ✅" : "Missing ❌");
console.log(
  "[ENV] ATLASDB_URL:",
  process.env.ATLASDB_URL ? "Loaded ✅" : "Missing ❌"
);

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
const reviewRoutes = require("./routes/review.js");
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

// DB Connection
const dbURL = process.env.ATLASDB_URL;

main()
  .then(() => console.log("[MongoDB] Connected ✅"))
  .catch((err) => console.error("[MongoDB] Connection Error ❌", err));

async function main() {
  await mongoose.connect(dbURL);
}

// App setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

console.log("[App] Middleware & view engine configured ✅");

// Session Store
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

store.on("error", function (err) {
  console.error("[Session Store Error ❌]", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

console.log("[Session] Configured ✅");

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

console.log("[Passport] Configured ✅");

// Flash & user middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Root route (health check)
app.get("/", (req, res) => {
  res.send("YelpCamp is live! 🚀");
});

// Routes
app.use("/listings", listings);
app.use("/listing/:id/review", reviewRoutes);
app.use("/", userRouter);

// Post a review
app.post(
  "/listings/:id/review",
  validateReview,
  wrapAsync(async (req, res) => {
    console.log("[Review] POST");
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

// Delete a review
app.delete(
  "/listings/:id/review/:revId",
  wrapAsync(async (req, res) => {
    console.log("[Review] DELETE");
    let { id, revId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: revId } }); // ✅ Fixed field name
    await review.findByIdAndDelete(revId);
    res.redirect(`/listings/${id}`);
  })
);

// 404 handler
app.all("*", (req, res, next) => {
  console.warn("[404] Route not found:", req.originalUrl);
  next(new ExpressError(404, "Page not found!"));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  console.error("[Server Error ❌]", err);
  res.status(statusCode).render("error", { err });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`[Server] Listening on port ${PORT} ✅`);
});
