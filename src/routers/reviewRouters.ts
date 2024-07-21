import { Router } from "express";
import { addReviewToBook } from "../controllers/reviewControllers";

const router = Router();

router.post("/addReview", addReviewToBook);   
router.put("/likeReview");


export default router