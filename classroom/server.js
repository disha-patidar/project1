const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const cookieParser=require("cookie-parser");



app.use(cookiePrser());
app.get("/",(req,res)=>{
  console.dir(req.cookies);
  res.send("hi,I am root");
});


app.get("/getcookies", (req,res)=>{
  res.cookie("greet","hello");
res.send("Sent you some cookies");
});
app.use("/users",users);
//Posts
app.use("/posts",posts);



app.listen(3000,()=>{
console.log("Server is listening to the port");
});