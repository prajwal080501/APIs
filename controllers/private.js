const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getPrivateData = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "You got access to the private data in this route",
        statusCode: 200,
    });
});
