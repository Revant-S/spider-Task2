import mongoose from "mongoose";
import { IReview} from "../TsTypes/reviewTypes";

const reviewSchema = new mongoose.Schema<IReview>({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        default : 0,
        min: 0,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments : {
        type : [{
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
            text: String
          }],
        default : []
    },
    likes : {
        type : Number,
        default : 0
    },
    dislikes : {
        type : Number,
        default : 0
    }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
