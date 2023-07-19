const router = require("express").Router();
const passport = require("passport");
const axios = require('axios');
const CLIENT_URL = "http://localhost:3000";

const { CosmosClient } = require('@azure/cosmos');

const endpoint = 'https://americancomposers.documents.azure.com:443/';
const key = 'KUkWogxJmmdUIHGl9B3QaCHU3100BO6H7Z6rdW0Daf6IGXWrUXXP6rZf7ZFZ5YSK14ZsqQoXjCctACDbcivASA==';
const databaseId = 'Forum';
const containerId = 'Users';




const cosmosClient = new CosmosClient({ endpoint, key });
const container = cosmosClient.database(databaseId).container(containerId);
// router.get("/login/success", async (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
//       //   cookies: req.cookies
//     });
//     await fetch("http://localhost:5000/user/create",{
//       method:"POST",
//       body: JSON.stringify(req.user),
//     })
//   }
// });
router.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });

    try {
      await axios.post("http://localhost:5000/user/create", req.user);
    } catch (error) {
      console.error("Error while making the request:", error);
    }
  }
});
router.post("/login/email", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  // check if email exists in db
  const querySpec = {
    query: 'SELECT * FROM c WHERE c.email = @email',
    parameters: [
      { name: '@email', value: email }
    ]
  };
  const { resources: matchingUsers } = await container.items.query(querySpec).fetchAll();
  if (matchingUsers.length > 0) {
    console.log('email exists');
    // Email already exists, return the matching user data
    
    const existingUser = matchingUsers[0];

    res.json(existingUser);
  }
  else{
    // Email does not exist, return an error
    res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  // if (req.body.email) {
  //   res.status(200).json({
  //     success: true,
  //     message: "successfull",
  //     user: req.body.email,
  //   });

  //   try {
  //     await axios.post("http://localhost:5000/user/create", req.body.email);
  //   } catch (error) {
  //     console.error("Error while making the request:", error);
  //   }
  // }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router