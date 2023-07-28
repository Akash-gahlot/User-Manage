const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587, 
  secure: false, 
  auth: {
    user: 'akashgahlot1926@gmail.com', 
    pass: 'Your SMTP Password', 
  },
});

const sendEmailWithOTP = (email, otp ,callback) => {
  const mailOptions = {
    from: 'akashgahlot1926@gmail.com', 
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for registration is: ${otp}`,
    html: `<p>Your OTP for registration is: <strong>${otp}</strong></p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log('Error sending email:', err);
        callback(err)
    } else {
        console.log('Email sent:', info.response);
        callback(null);
    }
  });
};

module.exports = { sendEmailWithOTP };
