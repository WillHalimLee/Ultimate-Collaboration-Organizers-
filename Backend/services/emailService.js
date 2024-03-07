const sgMail = require('@sendgrid/mail');
const User = require("../models/User");  // Adjust the path to where your User model is defined

sgMail.setApiKey('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\n'); // Set your SendGrid API key

async function sendEmergencyEmailToDevelopers(task, developerIds) {
    // Fetch developer details
    const developers = await User.find({
        '_id': { $in: developerIds }
    });

    // Extract emails
    const emails = developers.map(dev => dev.email);

    // Create a personalized email for each developer
    const messages = emails.map(email => ({
        to: email,
        from: '\t\n' +
            'joao.zuccati@gmail.com', // Replace with your verified sender email
        subject: 'Emergency Task Update',
        text: `The task "${task.title}" (${task.description}) has been set to Emergency. Please check it immediately.`,
        html: `<strong>The task "${task.title}" (${task.description}) has been set to Emergency. Please check it immediately.</strong>`,
    }));

    // Send the emails
    try {
        await sgMail.send(messages);
        console.log('Emergency emails sent to developers.');
    } catch (error) {
        console.error('Error sending emergency emails:', error);
    }
}

module.exports = {
    sendEmergencyEmailToDevelopers
};
