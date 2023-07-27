const User = require("../Models/user");
const { sendEmailWithOTP } = require("../Services/emailOTP");

const { PHONE_ALREADY_EXISTS_ERR } = require("/Users/akashgahlot/Desktop/Code/Test/User Management/errors")
exports.register = async(req, resp,next) => { 
    try {
        const { firstname, lastname, phone, email } = req.body;
        const phoneExist =  await User.findOne({ phone });
        if (phoneExist) {
            next({ status: 400, message: PHONE_ALREADY_EXISTS_ERR });
            return;
        }
        const newUser = new User({
            firstName,
            lastname,
            email,
            phone
        })

    }
    catch (err) { 
        next(err);
    }
}

exports.home = (req, resp) => { 
    sendEmailWithOTP("akashgahlottest@gmail.com", 123456, (err) => { 
        if (err) {
            resp.status(500).send("Error sending OTP email");
        }
        else { 
             resp.send("OTP sent");
        }
    });    
   
}