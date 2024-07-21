import { Router } from "express";
import {
    addTheBook,
    viewBook,
    likeBook,
    toggleFavoriteBook,
    deleteBook
} from "../controllers/bookControllers";
import { MulterUploadService } from "../middlewares/uploadServices";
import path from "path";
const pathToSave = path.resolve(__dirname, '../../public/uploads/bookCoverImage');
const bookUploadMiddleWare = new MulterUploadService(pathToSave);
const bookCoverUploadMiddleware = bookUploadMiddleWare.getUploadMiddleWare();

const router = Router();

router.post("/addBook", bookCoverUploadMiddleware.single('bookCoverImage'), addTheBook)
router.get("/viewBook/:bookId", viewBook)
router.put("/like", likeBook)
router.put("/addToFav", toggleFavoriteBook)
router.delete("/deleteBook/:bookId", deleteBook)
export default router