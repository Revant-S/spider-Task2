import { Router } from "express";
import {
    getSignUpPage, getSigninPage, signin, userSignUp,
    assignTempPassword,
    resetPasswordPage,
    getEmailPage,
    resetPasswordInDb,
    enterWithGoogle
} from "../controllers/authControllers";

const router = Router();


router.get("/signup", getSignUpPage)
router.post("/signup", userSignUp)
router.get("/signin", getSigninPage)
router.post("/signin", signin)
router.get("/getEmailPage", getEmailPage)
router.post("/getCode", assignTempPassword)
router.get("/resetPassword", resetPasswordPage)
router.post("/resetPassword",resetPasswordInDb)
router.get("/google/redirect", enterWithGoogle)
export default router