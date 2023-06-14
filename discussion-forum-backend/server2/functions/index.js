/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var functions = require("firebase-functions");
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
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

app.use("/auth",authRoute);
app.use("/post",postRoute);
app.use("/user",userRoute);

exports.api = functions.https.onRequest(app);