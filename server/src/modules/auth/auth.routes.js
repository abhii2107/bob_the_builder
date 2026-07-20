const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");
const validate = require("../../middleware/validate.middleware");
const {
  registerValidation,
  loginValidation,
} = require("./auth.validation");

const { protect } =
require("../../middleware/auth.middleware");

router.post(
  "/register",
  registerValidation,
  validate,
  authController.register
);
router.post(
  "/login",
  loginValidation,
  validate,
  authController.login
);
router.get(
    "/me",
    protect,
    (req,res)=>{
        res.json(req.user);
    }
);
module.exports = router;