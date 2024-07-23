import { Request, Response } from "express";
import Book from "../dbModels/booksModel";
import { getUserFromRequest } from "./bookControllers";


export async function getPurchasePage(req: Request, res: Response) {
    const { bookId } = req.params;
    if (!bookId) return res.send("Book Cannot Be purchased");
    const book = await Book.findById(bookId);
    if (!book) return res.send("Book Cannot Be purchased");
    console.log(book);
    
    res.render("purchasePage", {
        book
    })
}

export async function purchaseBook(req : Request , res : Response) {
    const user = await getUserFromRequest(req);
    if(!user)return res.send("You Dont Exit");    
    console.log(req.body);
    
    const { bookId } = req.body;
    console.log(bookId);
    
    const bookInDb = await Book.findById(bookId);

    if(!bookInDb) return res.send("Book is not present");
    const userMoney = user.coins;
    const price = bookInDb.cost.amount;
    if(price>userMoney) return res.send("Insufficient Coins!!");
    user.purchases.push(bookInDb._id);
    user.coins-=price;
    await user.save();
    return res.send("Book Purchased Sucessfully");
}

export async function myPurchases(req : Request , res : Response) {
    const user = await getUserFromRequest(req);
    if(!user) return res.send("User Not Found");
    await user.populate([{
        path : "purchases"
    }]),
    res.render("myPurchases" , {
        user
    })
}