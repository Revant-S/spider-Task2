import { Model, Types } from "mongoose";
export interface IUserModel{
    userName : string,
    password : string,
    books : Types.ObjectId[],
    email : string,
    purchases : Types.ObjectId[],
    reviews : Types.ObjectId[],
    profileImageURL : string,
    followers : Types.ObjectId[],
    favourites : Types.ObjectId[],
    likedBooks : Types.ObjectId[],
    lastSearched : string,
    coins : number  ,
    likedReviews : Types.ObjectId[], 
    dislikedReviews : Types.ObjectId[], 
    following : Types.ObjectId[],
    cart : Types.ObjectId[],
    starGiven : starObj[]
}

export interface starObj {
    ratingGiven : number,
    review : Types.ObjectId
}


export interface IUserMethods{
    getAuthToken() : string
}

export type UserModel = Model<IUserModel , {} , IUserMethods>;


export interface userSignupBody{
    userName? : string,
    password : string,
    email : string
}