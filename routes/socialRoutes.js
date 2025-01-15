const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Function to generate JWT and redirect with user data
const handleAuthCallback = (req, res) => {
  const { user } = req; // Get the user from the request object (already serialized)
  
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Set token expiration as needed
  );

  const data = {
    token,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picture: user.picture,
    },
  };

  // Encode the data object for safe URL passing
  const encodedData = encodeURIComponent(JSON.stringify(data));
  res.redirect(`http://localhost:3000/profile?UserData=${encodedData}`);
};

// Google Authentication Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  handleAuthCallback
);



// Facebook Authentication Routes
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  handleAuthCallback
);

module.exports = router;
