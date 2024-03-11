const nodemailer = require('nodemailer');
const User = require("../models/User");  // Adjust the path to where your User model is defined

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

async function sendEmergencyEmailToDevelopers(task, developerIds) {
    // Fetch developer details
    const developers = await User.find({
        '_id': { $in: developerIds }
    });

    // Extract emails
    const emails = developers.map(dev => dev.email);

    // Create and send a personalized email for each developer
    emails.forEach(email => {
        const mailOptions = {
            from: 'tcssgroup574@gmail.com', // Sender address
            to: email, // List of receivers
            subject: 'Emergency Task Update', // Subject line
            text: `The task "${task.title}" (${task.description}) has been set to Emergency. Please check it immediately.`, // Plain text body
            html: `<strong>The task "${task.title}" (${task.description}) has been set to Emergency. Please check it immediately.</strong>`, // HTML body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error sending email:', error);
            }
            console.log('Email sent: %s', info.messageId);
        });
    });
}

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
    sendEmergencyEmailToDevelopers,
    sendEmergencyEmail
};
