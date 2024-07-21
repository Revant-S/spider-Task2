import { Router } from "express";
import { getMyProfile } from "../controllers/userController";

const router = Router();

router.get("/myProfile",getMyProfile)

export default router


