import { Router } from "express";
import { getSignUpPage, getSigninPage, signin, userSignUp } from "../controllers/authControllers";

const router = Router();


router.get("/signup" , getSignUpPage)
router.post("/signup" , userSignUp)
router.get("/signin", getSigninPage)
router.post("/signin", signin )


export default router