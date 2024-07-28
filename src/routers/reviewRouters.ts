import { Router } from "express";
import {
    addReviewToBook,
    commentOnReview,
    editReview,
    deleteReview,
    likeDisLikeResponse,
    getFriendReviews
} from "../controllers/reviewControllers";


const router = Router();

router.post("/addReview", addReviewToBook);
router.put("/commentOnReview", commentOnReview)
router.put("/editreview", editReview)
router.delete("/deleteRoute", deleteReview)
router.put("/likeDislikeReview", likeDisLikeResponse)
router.get("/getFriendReviews",getFriendReviews)

export default router;