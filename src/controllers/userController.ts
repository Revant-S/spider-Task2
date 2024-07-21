import { Request, Response } from "express";
import { getUserFromRequest } from "./bookControllers";




export async function getMyProfile(req : Request , res : Response) {
    const user = await getUserFromRequest(req);
    if(!user) return res.send("You Are not authorised!!!");
    const populatedUser = await user.populate([{
        path : "books"
    },{
        path : "favourites"
    },{
        path : "likedBooks"
    }])
    res.render("myProfile", {
        user: populatedUser
    })
}