import { Request, Response } from "express";
import { UserRequest } from "../middlewares/authMiddleWare";
import User from "../dbModels/userModel";
import { verifyAddBookBody } from "../zodVerification/requestBody";
import { bookBody } from "../TsTypes/bookTypes";
import Book from "../dbModels/booksModel";
import Review from "../dbModels/reviewDbModel";
import { searchASpecificVolume, searchOnine } from "../otherApiServices/googleBooksApi";
import mongoose from "mongoose";

// import { AxiosError } from "axios";
// import { extend } from "lodash";

export interface SearhRequest {
    search: string,
    term: string
}
export async function getUserFromRequest(req: Request) {
    const userId = (req as UserRequest).userJwtPayLoad.id
    return await User.findById(userId);
}
export async function createBookEntry(body: bookBody, fileName: string | undefined) {
    const authorsArray: string[] = JSON.parse(body.authors);
    return await Book.create({
        title: body.bookName,
        authors: authorsArray,
        publisher: body.publisher,
        description: body.Description,
        imageLink: `/public/uploads/bookCoverImage/${fileName}`
    })
}


export async function addTheBook(req: Request, res: Response) {
    const user = await getUserFromRequest(req)
    if (!user) return res.send("You DOnt exit!!");
    const verification = verifyAddBookBody(req.body);
    console.log(verification.error);
    if (!verification.success) return res.send(verification.error);
    const newEntry = await createBookEntry(req.body, req.file?.filename)
    const updateUser = await User.findByIdAndUpdate(user._id, { $push: { books: newEntry._id } })
    if (!updateUser) return res.json({ success: false })
    res.json({
        success: true,
        bookDetails: newEntry
    })
}


export async function viewBook(req: Request, res: Response) {
    const bookId = req.params.bookId;
    const user = await getUserFromRequest(req)
    if (!user) return res.send("YOU DONT EXIST");
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        const bookInDb = await Book.findOne({ apiId: bookId });
        if (!bookInDb) {
            const requiredBook = await searchASpecificVolume(bookId);
            if (!requiredBook) return res.status(400).json({ message: "Resource  Not Found" });
            console.log(requiredBook);
            
            const newBook = await Book.create({
                title: requiredBook.volumeInfo.title,
                authors: requiredBook.volumeInfo.authors,
                publisher: requiredBook.volumeInfo.publisher,
                description: requiredBook.volumeInfo.description,
                imageLink: requiredBook.volumeInfo.imageLinks.thumbnail,
                apiId: requiredBook.id
            });
            console.log(newBook.description);
            
            return res.render("individualBook",{
                book : newBook,
                likedThisBook : false,
                favBook : false
            })
        }
        const likedIndex = user.likedBooks.indexOf(bookInDb._id);
        const favIndex = user.favourites.indexOf(bookInDb._id);
        return res.render("individualBook", {
            book : bookInDb,
            likedThisBook: !(likedIndex === -1),
            favBook: !(favIndex === -1)
        })
    }
    const book = await Book.findById(bookId);
    if (!book) return res.send("Book Not Found");
    const likedIndex = user.likedBooks.indexOf(book._id);
    const favIndex = user.favourites.indexOf(book._id);
    res.render("individualBook", {
        book,
        likedThisBook: !(likedIndex === -1),
        favBook: !(favIndex === -1)
    })
}


export async function likeBook(req: Request, res: Response) {
    try {
        
        const bookId = req.body.bookId;
        const user = await getUserFromRequest(req);
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });
        if (!user) return res.status(404).json({ message: "User not found" });
        const likedIndex = user.likedBooks.indexOf(book._id);
        let message: string;
        if (likedIndex === -1) {
            user.likedBooks.push(book._id);
            book.likes += 1;
            message = "Book liked successfully";
        } else {
            user.likedBooks.splice(likedIndex, 1);
            book.likes -= 1;
            message = "Book unliked successfully";
        }
        await user.save();
        await book.save();
        res.status(200).json({
            message,
            likes: book.likes,
            isLiked: likedIndex === -1
        });

    } catch (error) {
        console.error('Error in toggleLikeBook:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function toggleFavoriteBook(req: Request, res: Response) {
    try {
        const bookId = req.body.bookId;
        const user = await getUserFromRequest(req);
        const book = await Book.findById(bookId);

        if (!book) return res.status(404).json({ message: "Book not found" });
        if (!user) return res.status(404).json({ message: "User not found" });

        const favoriteIndex = user.favourites.indexOf(book._id);
        let message: string;

        if (favoriteIndex === -1) {
            user.favourites.push(book._id);
            message = "Book added to favorites successfully";
        } else {
            user.favourites.splice(favoriteIndex, 1);
            message = "Book removed from favorites successfully";
        }

        await user.save();

        res.status(200).json({
            message,
            isFavorite: favoriteIndex === -1,
            favorites: user.favourites.length
        });

    } catch (error) {
        console.error('Error in toggleFavoriteBook:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteBook(req: Request, res: Response) {
    const bookId = req.params.bookId;

    try {
        await Book.findByIdAndDelete(bookId);
        await User.updateMany(
            {
                $or: [
                    { favourites: bookId },
                    { likedBooks: bookId },
                    { books: bookId }
                ]
            },
            {
                $pull: {
                    favourites: bookId,
                    likedBooks: bookId,
                    books: bookId
                }
            }
        );
        await Review.deleteMany({ book: bookId });

        res.status(200).json({ success: true, message: 'Book and associated data deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete book and associated data' });
    }
}

export async function searchTheBookOnline(req: Request, res: Response) {
    const user = await getUserFromRequest(req);
    if (!user) return res.json({ success: false, data: "User Not found" });
    let { search, term } = req.query;
    console.log(search);

    if (!term) term = "intitle";
    try {
        const searchResponse = await searchOnine((search as string), (term as string));
        return res.status(200).json({
            success: true,
            data: searchResponse
        })
    } catch (error: any) {
        console.log("HERE");
        
        console.log(error.message);
        return res.status(404).json({
            success: false,
            data: "server Error"
        })
    }
}

export async function changeProfileImage(req : Request , res : Response) {
    const user = await getUserFromRequest(req)
    if(!user) return res.status(404).send("User not Found");
    user.profileImageURL = `/public/uploads/profileImages/${req.file?.filename}`;
    await user.save()
    res.json({
        success : true,
        message : "Profile Changed Sucessfully!!!"
    })
}