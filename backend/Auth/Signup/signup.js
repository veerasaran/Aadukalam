const { PrismaClient } = require('../../dbSchema/generated');
const { hashGenerator } = require('../hashAndOtp/hashGenerator');
const { OtpGenerator } = require('../hashAndOtp/OtpGenerator');
const { SendEmail } = require('../sendEmail/email');

const prisma = new PrismaClient();


async function signUp(req,res) {
    const utc = new Date();
    const currTime= new Date(utc.getTime()+5.5*60*60*1000);
    const exp = new Date(currTime.getTime()+10*60*1000);
    const saltHash = await hashGenerator(req.body.password);
    if(saltHash.err){
        res.status(200).json({...saltHash})
    }
    else{
        const otp = OtpGenerator();
    try{
        const student = await prisma.oTPStudent.upsert({
            where: { rno: req.body.rno },
            update: {
                name: req.body.name,
                uname: req.body.uname,
                salt: saltHash.salt,
                hash: saltHash.hash,
                leetCodeProfile: req.body.leetCodeProfile,
                otp: otp,
                expiry: exp,
                status: "PENDING"
            },
            create: {
                name: req.body.name,
                rno: req.body.rno,
                uname: req.body.uname,
                salt: saltHash.salt,
                hash: saltHash.hash,
                leetCodeProfile: req.body.leetCodeProfile,
                otp: otp,
                expiry: exp,
                status: "PENDING"
            }
        });
        const sendEmail = await SendEmail(req.body.rno+"@rajalakshmi.edu.in" , otp);
        if(sendEmail.success){
            res.status(200).json({
                msg:"OTP is sent successfully"
            })
        }
        else{
            res.status(200).json({
                err: "Email Error: " + sendEmail.error
            })
        }
    }
    catch(error){
        console.log(error)
        global.lastSignupError = error.message || error.toString();
        res.status(400).json({
            err: error.message || "Internal error"
        })
    }
    }
    
}

module.exports =  {
    signUp
}