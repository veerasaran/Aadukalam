const nodemailer = require("nodemailer")
require('dotenv').config()

async function SendEmail(toAddr , otp) {
    console.log(process.env.EMAIL_ID , process.env.PASSWORD)
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL_ID, 
                pass: process.env.PASSWORD
            },
        });

        const mailObject = {
            from : process.env.EMAIL_ID,
            to : toAddr , 
            subject  : "Leo Das",
            text: ` ${otp}`
        }

        const status = await transporter.sendMail(mailObject);
        return { success: true };
    }
    catch (error){
        console.log("Email Error:", error);
        const debugInfo = `(Debug - Email: ${process.env.EMAIL_ID || 'MISSING'}, Pass: ${process.env.PASSWORD ? 'PROVIDED' : 'MISSING'})`;
        return { success: false, error: `${error.message} ${debugInfo}` };
    }
}

// async function run() {
//     const status = await SendEmail('220701234@rajalakshmi.edu.in','Naa than da leo... leo das')
//     console.log(status)
// }
// run()

module.exports = {
    SendEmail
}