const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'koorzenb@gmail.com',
        subject: "Thank you for joining in!",
        text: `Welcome to the app, ${name}. Let us know how it is going`
        // html: "<p>my paragraph</p>
        // <style>" Can send fancy HTML email 
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'koorzenb@gmail.com',
        subject: "Cancellation of Subscription",
        text: `So sorry to see you go, ${name}. Let us know how we can improve` 
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}