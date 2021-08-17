
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail.send({
    to: "koorzenb@gmail.com",
    from: "koorzenb@gmail.com",
    // NB: remember to create my own website and use it's domain in "from", otherwise will result in being flagged as spam
    subject: "My first creation",
    text: "Hope this email finds you well, Barend."
    
})