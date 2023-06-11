const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const userRoute  = require("./routes/users")
const app = express();
app.use(express.json({ type: '*/*' }));
require('./passport')
app.use(cookieSession(
    {
        name:"session",
        keys:["session"],
        maxAge: 24*60*60*100
    }
))

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }))

app.use("/auth",authRoute);
app.use("/post",postRoute);
app.use("/user",userRoute);

app.get("/",(req,res)=>{
    res.status(200).json({message:"Connected!"})
})

app.listen("5001",()=>{
    console.log("listening on http://localhost:5001");
})