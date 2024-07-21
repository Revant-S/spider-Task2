import { Response, Request } from "express";
import { Types } from "mongoose";
import Review from "../dbModels/reviewDbModel";
import Book from "../dbModels/booksModel";
import { getUserFromRequest } from "./bookControllers";
import User from "../dbModels/userModel";

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
