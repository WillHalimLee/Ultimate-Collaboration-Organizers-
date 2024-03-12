const nodemailer = require('nodemailer');
const User = require("../models/User");

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({

    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tcssgroup574@gmail.com',
        pass: 'mfsc lnxv fthb mpql',
    },
});

async function sendEmergencyEmail(task) {
    try {
        const developers = await User.find({ job: "developer" }).exec(); // Assuming "developer" is a job designation in your User model
        const emails = developers.map(dev => dev.email);

        const mailOptions = {
            from: 'tcssgroup574@gmail.com',
            to: emails, // Sending to multiple recipients
            subject: 'Emergency Task Update',
            text: `The task "${task.title}" has been set to Emergency status. Please check it immediately.`,
            html: `<strong>The task "${task.title}" has been set to Emergency status. Please check it immediately.</strong>`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Emergency emails sent to developers.');
    } catch (error) {
        console.error('Error sending emergency emails:', error);
    }
}

module.exports = {
    sendEmergencyEmail
};
