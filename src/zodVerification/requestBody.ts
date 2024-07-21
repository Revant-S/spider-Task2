import { z } from "zod";
import { userSignupBody } from "../TsTypes/userTypes";
import { bookBody } from "../TsTypes/bookTypes";


const signUpBodySchema = z.object({
    userName : z.string().min(6).optional(),
    password : z.string().min(6),
    email : z.string().email()
})
const addBookSchema = z.object({
    bookName : z.string(),
    authors : z.string(),
    publisher : z.string().optional(),
    Description : z.string()
})

export function verifySignupBody(body : userSignupBody) {
    return signUpBodySchema.safeParse(body)
}

export function verifyAddBookBody(body :bookBody ) {
    return addBookSchema.safeParse(body)
}