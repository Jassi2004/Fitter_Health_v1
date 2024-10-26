const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send emails
const mailSender = async (email, title, body) => {
    try {
        // Create a transporter using SMTP
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // Send email
        let info = await transporter.sendMail({
            to: email,
            subject: title,
            html: body,
        });
        console.log('Email info: ', info);
    } catch (error) {
        console.log('Error while sending mail: ', error);
    }
};

module.exports = mailSender;