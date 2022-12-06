const nodemailer = require('nodemailer')
exports.sendEmail = (options) => {
    var smtpConfig = {
        host: process.env.EMAIL_SERVICE,
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);


    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}
