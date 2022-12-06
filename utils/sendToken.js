const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).send({
        success: true,
        token,
        user
    });
};

module.exports = sendToken;