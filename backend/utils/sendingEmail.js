const mailSender = require('../config/nodemailer.js');
const { 
    verificationEmailTemplate, 
    welcomeEmailTemplate,
    passwordResetRequestTemplate, 
    passwordResetSuccessTemplate 
} = require('./emailTemplates.js');

// Function to send verification email
const sendVerificationMail = async (email, verificationToken) => {
    try {
        const recipient = email;
        const subject = "Verify your email";
        const html = verificationEmailTemplate(verificationToken);

        const response = await mailSender(recipient, subject, html);
        console.log("Verification email sent successfully", response);
        return response;
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};

// Function to send welcome email
const sendWelcomeMail = async (email, name) => {
    try {
        const recipient = email;
        const subject = "Welcome to our platform!";
        const html = welcomeEmailTemplate(name);

        const response = await mailSender(recipient, subject, html);
        console.log("Welcome email sent successfully", response);
        return response;
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw error;
    }
};

// Function to send password reset email
const sendResetPasswordMail = async (email, resetUrl) => {
    try {
        const recipient = email;
        const subject = "Reset your password";
        const html = passwordResetRequestTemplate(resetUrl);

        const response = await mailSender(recipient, subject, html);
        console.log("Reset password email sent successfully", response);
        return response;
    } catch (error) {
        console.error("Error sending reset password email:", error);
        throw error;
    }
};

// Function to send password reset success email
const sendPasswordResetSuccessMail = async (email) => {
    try {
        const recipient = email;
        const subject = "Password Reset Success";
        const html = passwordResetSuccessTemplate();

        const response = await mailSender(recipient, subject, html);
        console.log("Password reset success email sent successfully", response);
        return response;
    } catch (error) {
        console.error("Error sending password reset success email:", error);
        throw error;
    }
};

module.exports = {
    sendVerificationMail,
    sendWelcomeMail,
    sendResetPasswordMail,
    sendPasswordResetSuccessMail
};