import { Router } from "express";
import {
    addTheBook,
    viewBook,
    likeBook,
    toggleFavoriteBook,
    deleteBook,
    searchTheBookOnline,
    changeProfileImage,
    getAddBookPage,
    getMyBooks
} from "../controllers/bookControllers";
import { MulterUploadService } from "../middlewares/uploadServices";
import path from "path";
const pathToSave = path.resolve(__dirname, '../../public/uploads/bookCoverImage');
const pathToProfileImage = path.resolve(__dirname , '../../public/uploads/profileImages')
const bookUploadMiddleWare = new MulterUploadService(pathToSave);
const bookCoverUploadMiddleware = bookUploadMiddleWare.getUploadMiddleWare();
const profileImageUploadMiddleware = new MulterUploadService(pathToProfileImage);
const profileUploadMiddleWare = profileImageUploadMiddleware.getUploadMiddleWare();
const router = Router();

router.post("/addBook", bookCoverUploadMiddleware.single('bookCoverImage'), addTheBook)
router.get("/viewBook/:bookId", viewBook)
router.put("/like", likeBook)
router.put("/addToFav", toggleFavoriteBook)
router.delete("/deleteBook/:bookId", deleteBook)
router.get("/search", searchTheBookOnline)
router.put("/changeProfileImage" ,profileUploadMiddleWare.single('profileImage') , changeProfileImage )
router.get("/addBook",getAddBookPage )
router.get("/myBooks", getMyBooks)

export default router