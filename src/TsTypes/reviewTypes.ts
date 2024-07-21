import { Request} from "express";
import {Types} from "mongoose";

export interface IReview {
    _id: Types.ObjectId;
    book: Types.ObjectId | string; 
    user: Types.ObjectId | string; 
    rating: number;
    comment: string;
    createdAt?: Date;
}


export interface AddReviewRequest extends Request {
    body: {
        bookId: string; 
        rating?: number;
        comment?: string;
    };
}

