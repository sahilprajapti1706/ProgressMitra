const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const userController = require("../controller/user");

router.get("/signup", userController.renderSignupPage);

router.post("/signup", userController.signup);

router.get("/login", userController.renderLoginPage);

router.post("/login" ,
                passport.authenticate("local" , {failureRedirect : "/login" , failureFlash: true}) ,
                userController.login  );

router.get("/logout", userController.logout);                

module.exports = router;