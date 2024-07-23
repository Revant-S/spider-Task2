import { Request, Response } from "express";
import { userSignupBody } from "../TsTypes/userTypes";
import { verifySignupBody } from "../zodVerification/requestBody";
import User from "../dbModels/userModel";
import bcrypt from "bcrypt"
import { sendEmail } from "../otherApiServices/mailService";
import crypto from "crypto"

function generateRandomString(length: number) {
    const bytesNeeded = Math.ceil(length / 2); 
    const randomBytes = crypto.randomBytes(bytesNeeded);
    const hexString = randomBytes.toString('hex');
    return hexString.slice(0, length);
}


export async function getSignUpPage(req: Request, res: Response) {
    return res.render("signupPage")
}
export async function getSigninPage(req: Request, res: Response) {
    return res.render("signinPage")
}

export async function userSignUp(req: Request, res: Response) {
    const reqBody: userSignupBody = req.body;
    const verificaton = verifySignupBody(reqBody);
    if (!verificaton.success) return res.status(404).send(verificaton.error.message);
    try {
        const newUser = await User.create({
            userName: reqBody.userName,
            password: reqBody.password,
            email: reqBody.email
        })
        const token = newUser.getAuthToken();
        return res.cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true
        }).redirect("/home");
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "User already exists" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function signin(req: Request, res: Response) {
    const signInBody: userSignupBody = req.body;
    const verification = verifySignupBody(signInBody);

    if (!verification.success) return res.status(404).send(verification.error.message);
    const userIndb = await User.findOne({ email: signInBody.email });
    if (!userIndb) return res.status(400).send("userName or Password incorrect");
    const authorise: boolean = await bcrypt.compare(signInBody.password, userIndb.password);
    if (!authorise) return res.status(400).send("userName or Password incorrect");
    const token = userIndb.getAuthToken();
    return res.status(200).cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true
    }).redirect("/home");
}



export async function getEmailPage(req : Request , res : Response) {
   return res.render("emailPage") 
}
export async function assignTempPassword(req : Request , res : Response) {
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.send("User Not Found");
    const passCode = generateRandomString(10);
    await sendEmail(user.email , passCode);
    user.password = passCode;
    await user.save();
    return res.redirect("/auth/resetPassword");
}

export async function resetPasswordPage(req : Request , res : Response) {
    res.render("resetPassword");   
}

export async function resetPasswordInDb(req : Request , res : Response) {
    const {email , newPassword, passCode} = req.body
    const user = await User.findOne({email : email});
    if(!user) return res.send("No User Found");
    const verified = await bcrypt.compare(passCode , user.password);
    if(!verified) return res.send("Incorrect Passcode");
    user.password = newPassword;
    await user.save()
    return res.send("PassWord is reset Sucessfully!!!");
}