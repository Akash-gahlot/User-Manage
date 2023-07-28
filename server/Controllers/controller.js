const User = require("../Models/user");
const crypto = require('crypto');
const path = require('path');
const { sendEmailWithOTP } = require("../Services/emailOTP");
const { generateJWT } = require("../Services/jsonwebToken");


const { EMAIL_ALREADY_EXISTS_ERR,USER_NOT_FOUND_ERR } = require("/Users/akashgahlot/Desktop/Code/Test/User Management/errors")
var createotp = '';

const generateOTP = () => {
    createotp = '';
  const otpLength = 6;
  const digits = '0123456789';
  for (let i = 0; i < otpLength; i++) {
    createotp += digits[Math.floor(Math.random() * digits.length)];
  }
  return createotp;
};
exports.register = async(req, resp,next) => { 
    try {
        const { firstname, lastname, phone, email } = req.body;     
        const emailExist =  await User.findOne({ email });
        if (emailExist) {
            next({ status: 400, message: EMAIL_ALREADY_EXISTS_ERR });
            return;
        }
        createotp = generateOTP(); 
        await sendEmailWithOTP(email, createotp, (err) => {
            if (err) {
                createotp = '';
                resp.status(404).json({ message: "Some error while sending OTP : " + err });
                return;
            }
            else { 
                resp.status(200).json({ message: 'OTP sent to your email , please verify it for successfull registration' });
            }
        });        
     
    }
    catch (err) { 
        next(err);
    }
}
exports.otpverify = async (req, resp , next) => { 
    try {
        const { email, otp, firstname, lastname, phone, processType} = req.body;   
        if (processType == "login") 
        {
            if (otp == createotp) {
                createotp = '';
                const user = await User.findOne({ email });
                const token = generateJWT(email);
                resp.status(200).json({ message:"Succcessfull Login , token : "+token ,user,token });
            }
            else { 
                 return resp.status(400).json({ message: 'Invalid OTP' });
            }
        }
        else {          
            if (otp == createotp) {
                createotp = '';
                const newUser = new User({
                    firstname,
                    lastname,
                    email,
                    phone,
                });
                await newUser.save();
                resp.status(200).json({ message: ' Valid Email Id , User Registered successfully' });
            
            }
            else { 
                
                resp.status(400).json({ message: 'Invalid OTP' });
                return;
            }
        }
    }
    catch (err) { 
        next(err);
    }
}
exports.login = async(req, resp, next) => { 
    try {
        const { email } = req.body;
        const emailExist = await User.findOne({ email });
        if (!emailExist) {
            next({ status: 400, message: USER_NOT_FOUND_ERR });
            return;
        }
        createotp = generateOTP();
         await sendEmailWithOTP(email, createotp, (err) => {
            if (err) {
                createotp = '';
                resp.status(404).json({ message: "Some error while sending OTP : " + err });
                return;
            }
            else { 
                resp.status(200).json({ message: 'OTP sent to your email , please verify it for successfull login' });
            }
        });  
    }
    catch (err) { 
        next(err);
    }
}
exports.home = async (req, resp,next) => {
    try {
        resp.sendFile(path.join(__dirname, '../views/home.html'));
    }
    catch (err) { 
        next(err);
    }
}

exports.registration = async (req, resp,next) => { 
    try {
        resp.sendFile(path.join(__dirname, '/Users/akashgahlot/Desktop/Code/Test/User Management/server/views/registration.html'));
    }
    catch (err) { 
        next(err);
    }
}
exports.signin = async (req, resp,next) => { 
    try {
        resp.sendFile(path.join(__dirname, '/Users/akashgahlot/Desktop/Code/Test/User Management/server/views/login.html'));
    }
    catch (err) { 
        next(err);
    }
}
