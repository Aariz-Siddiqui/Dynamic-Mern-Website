const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controllers");
const {signupSchema,signinSchema} = require('../validator/auth-validator');
const Validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authcontroller.home);
router.route("/register").post(Validate(signupSchema),authcontroller.register);
router.route("/login").post(Validate(signinSchema),authcontroller.login);
router.route("/user").get(authMiddleware,authcontroller.user);
module.exports = router;
