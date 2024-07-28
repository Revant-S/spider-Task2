import mongoose from "mongoose";
import { IUserMethods, IUserModel, UserModel } from "../TsTypes/userTypes";
import jwt from "jsonwebtoken"
import config from "config"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema<IUserModel, UserModel, IUserMethods>({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    reviews: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
        default: []
    },
    followers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    following: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    purchases: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }],
        default: []
    },
    cart: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }],
        default: []
    },
    profileImageURL: {
        type: String,
        default: ""
    },
    books: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }],
        default: []
    },
    favourites: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }],
        default: []
    },
    likedBooks: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }],
        default: []
    },
    lastSearched: {
        type: String,
        default: ""
    },
    coins: {
        type: Number,
        default: 2000
    },
    likedReviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Review",
        default: []
    },
    dislikedReviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Review",
        default: []
    },
    starGiven: {
        type: [{
            ratingGiven: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            review: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review',
                required: true
            }
        }],
        default: []
    }

})


userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.getAuthToken = function (): string {
    const jwtPayLoad = {
        id: this._id,
        email: this.email,
    }
    return jwt.sign(jwtPayLoad, config.get("JWT_SECRET_KEY"))
}


const User = mongoose.model<IUserModel, UserModel>("User", userSchema);

export default User