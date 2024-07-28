import { Router } from "express";
import { getMyProfile, getUser, searchUserPage,searchUsers,followRequest } from "../controllers/userController";

const router = Router();

router.get("/myProfile",getMyProfile);
router.get("/searchUsers", searchUserPage)
router.get("/getUsers/:parameterToSearch",searchUsers )
router.get("/getUser/:userId", getUser)
router.post("/followUser",followRequest)
export default router


