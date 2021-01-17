const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const User = require("../../models/User");

// Load Input Validation handler
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route GET /api/users/test
// @desc  Tests users request
// @access Public
router.get("/test", (req, res) => res.json({ message: "Users Works" }));

// @route POST /api/users/register
// @desc  Register the user
// @access Public
router.post("/register", (req, res) => {
  // Validation handlers
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.user = "User already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", // Rating
        d: "mm", //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      //  Password encryption using bcryptor
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.status(201).json(user)) //promise
            .catch((err) => console.log(err));
        });
      });
    }
  }); //promise
});

// @route POST /api/users/login
// @desc  Login user/ Returning post request
// @access Public

router.post("/login", (req, res) => {
  // Validation handlers
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;
  //   Find by user
  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User is not found";
      res.status(404).json(errors);
    }
    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // res.json({ msg: "Success" });
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create the payload
        // Create a JWT token User matched
        jwt.sign(
          payload,
          keys.secret_key,
          { expiresIn: 3600, subject: user.id },
          (err, token) => {
            console.log(err);
            console.log(token);
            res.status(202).json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Incorrect Passoword";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET /api/users/current
// @desc  Return the current user
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json({ msg: "Success" });
    console.log(req.user);
    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
