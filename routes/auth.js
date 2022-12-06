const { application } = require('express');
const express = require('express');
const { Register, Login, Logout, ForgotPassword, ResetPassword } = require('../controllers/auth');
const { validateRegisterInput, validateLoginInput } = require('../utils/validator');

const router = express.Router();

router.post("/register", validateRegisterInput, Register);
router.post("/login", validateLoginInput, Login);
router.post("/logout", Logout);
router.post("/forgotpassword", ForgotPassword);
router.put("/resetpassword/:resettoken", ResetPassword);
module.exports = router;