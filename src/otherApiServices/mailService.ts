import nodemailer from "nodemailer"
import config from "config"
export const sendEmail = async (email: string, code: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "revant.sinha@gmail.com",
            pass: config.get("Book_Hub_App_Password")
        }
    })
    //conpose email
    const mailOptions = {
        from: "bookHub.com",
        to: email,
        subject: "Password Reset",
        text: `This is the Verification Code. 
        This is a temporary Password. Signin using this and You will be 
        redirected to the Password change 
        Page where you can change The Password:- ${code}`

    }
    try {
        await transporter.sendMail(mailOptions);
        console.log("mail Is Sent");
        
    } catch (error:any) {
        console.log(error.message);
        
    }
}



