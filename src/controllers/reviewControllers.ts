import { Response, Request } from "express";
import { Types } from "mongoose";
import Review from "../dbModels/reviewDbModel";
import Book from "../dbModels/booksModel";
import { getUserFromRequest } from "./bookControllers";
import User from "../dbModels/userModel";
// import { any } from "zod";

export async function getReviewsByBookId(bookId: Types.ObjectId) {
    try {
        const reviews = await Review.find({ book: bookId }).populate([{
            path: "User", select: "UserName"
        }]);
        return reviews
    } catch (error: any) {
        console.error("Error fetching reviews:", error);
        return (error.message)
    }
};


export async function addReviewToBook(req: Request, res: Response) {
    const user = await getUserFromRequest(req);
    const userId = user?._id
    const { bookId, comment } = req.body;


    try {
        const newReview = await Review.create({
            book: bookId,
            user: userId,
            comment,
        });
        const book = await Book.findByIdAndUpdate(
            bookId,
            { $push: { reviews: newReview._id } },
            { new: true }
        );
        const updateUser = await User.findByIdAndUpdate(userId,
            { $push: { reviews: newReview._id } })
        if (!updateUser) throw new Error("User Not Found")
        if (!book) throw new Error("Book not found");

        res.json({
            success: true
        });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const commentOnReview = async (req: Request, res: Response) => {
    const user = await getUserFromRequest(req);
    if (!user) return res.send("Nikal BSDk");
    const { commentId, comment } = req.body;
    try {
        const reviewInDb = await Review.findById(commentId);
        reviewInDb?.comments.push({
            userId: user._id,
            text: comment
        })
        await reviewInDb?.save();
        res.send("Done")
    } catch (error: any) {
        console.log(error.message);
        res.send("Something went wrong")
    }
}


export const editReview = async (req: Request, res: Response) => {
    const { reviewId, editedString } = req.body;
    if (!editedString || editedString.length == 0) {
        const reviewUpdated = await Review.findByIdAndDelete(reviewId)
        return res.send(reviewUpdated)
    }
    try {
        const reviewUpdated = await Review.findByIdAndUpdate(reviewId, { $set: { comment: editedString } }, { new: true });
        return res.send(reviewUpdated)
    } catch (error: any) {
        console.log(error.message);

    }
}

export const deleteReview = async (req: Request, res: Response) => {
    const { reviewId } = req.query;
    console.log("HERE!!!!!!!!");

    console.log(reviewId);

    const user = await getUserFromRequest(req);
    user?.reviews.splice(user.reviews.indexOf(new Types.ObjectId(reviewId as string)), 1)
    await user?.save();
    const book = await Book.findOne({ reviews: { $in: reviewId } });
    console.log(book);
    if (!book) {
        return res.send("No Such Book")
    }
    book.reviews.splice(book.reviews.indexOf(new Types.ObjectId(reviewId as string), 1));
    await book.save()
    const deleted = await Review.findByIdAndDelete(reviewId);
    console.log(deleted);
    res.send(deleted)
}


export const likeDisLikeResponse = async (req: Request, res: Response) => {
    try {
        const user = await getUserFromRequest(req);
        if (!user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const { reviewId, responseCode, amt } = req.body;
        let responseBody: { liked: boolean; message: string };

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (responseCode === 1) {
            if (!user.likedReviews.includes(reviewId)) {
                user.likedReviews.push(reviewId);
                review.likes += amt;
                responseBody = {
                    liked: true,
                    message: "Liked Successfully"
                };
                if (user.dislikedReviews.includes(reviewId)) review.dislikes -= 1;
            } else {
                user.likedReviews = user.likedReviews.filter(id => id.toString() !== reviewId);
                review.likes += amt;
                responseBody = {
                    liked: false,
                    message: "Removed the like successfully"
                };
            }
            user.dislikedReviews = user.dislikedReviews.filter(id => id.toString() !== reviewId);

        } else {
            if (!user.dislikedReviews.includes(reviewId)) {
                user.dislikedReviews.push(reviewId);
                review.dislikes += amt;
                responseBody = {
                    liked: false,
                    message: "Disliked Successfully"
                };
                if (user.likedReviews.includes(reviewId)) review.likes -= 1;
            } else {
                user.dislikedReviews = user.dislikedReviews.filter(id => id.toString() !== reviewId);
                review.dislikes += amt;
                responseBody = {
                    liked: false,
                    message: "Removed the dislike successfully"
                };
            }
            user.likedReviews = user.likedReviews.filter(id => id.toString() !== reviewId);
        }

        await user.save();
        await review.save();
        return res.json(responseBody);

    } catch (error) {
        console.error("Error in likeDisLikeResponse:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const getFriendReviews = async (req: Request) => {
    const user = await getUserFromRequest(req);
    if (!user) {
        return 
    }

    const response = await user.populate([{
        path: "following", select: "reviews, email", populate: [{
            path: "reviews",
            populate: {
                path: "book"
            }
        }]
    }])
   

    return response
}