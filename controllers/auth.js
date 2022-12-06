const User = require("../models/User");
const bcrypt = require("bcrypt");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorResponse = require("../utils/errorresponse");
const { validationResult } = require("express-validator");
const sendToken = require("../utils/sendToken");
const {sendEmail} = require("../utils/sendMail");
const crypto = require("crypto");
// Register a user => api/auth/register
exports.Register = catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req)
    !errors.isEmpty() && next(new ErrorResponse(errors.array()[0].msg, 400))
    const user = await User.findOne({ email: req.body.email });
    user && next(new ErrorResponse("User already exists", 400));
    const { username, email, password } = req.body;
    const newUser = await User.create({
        username,
        email,
        password,
    });
    sendToken(newUser, 200, res);
});

// Login user => api/auth/login
exports.Login = catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req)
    !errors.isEmpty() && next(new ErrorResponse(errors.array()[0].msg, 400))
    const user = await User.findOne({ email: req.body.email }).select("+password");
    !user ? next(new ErrorResponse("Invalid credentials", 401)) : null;
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword ? next(new ErrorResponse("Invalid credentials", 401)) : null;
    sendToken(user, 200, res);
});

exports.Logout = catchAsyncErrors(async (req, res, next) => {
    res.send('Logout');
});

exports.ForgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    !user && next(new ErrorResponse("User not found", 404))
    const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <button style="background-color: #1367ed; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">
        <a href=${resetUrl} style="color: white; text-decoration: none;">Reset Password</a>
        </button>
    `;
    try {
        await sendEmail({
            to: user.email,
            subject: 'Password reset request',
            text: message
        })
        res.status(200).json({
            success: true,
            data: 'Email sent'
        })
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return next(new ErrorResponse('Email could not be sent', 500))
    }
});

exports.ResetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) {
            return next(new ErrorResponse('Invalid reset token', 400))
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(201).json({
            success: true,
            data: 'Password reset success'
        })
    } catch (error) {
        console.log(error)
    } 
});

