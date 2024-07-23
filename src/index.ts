import 'dotenv/config'
import express, { Request, Response } from "express"
import path from "path";
import mongoose from "mongoose";
import config from "config";
import authRoutes from "./routers/authRoutes";
import morgan from "morgan"
import { authoriseUser } from './middlewares/authMiddleWare';
import bookRoutes from "./routers/bookRouters"
import cookieParser from 'cookie-parser';
import reviewRouters from "./routers/reviewRouters"
import { getUserFromRequest } from './controllers/bookControllers';
import userRoutes from "./routers/userRoutes"
import purchaseRoutes from "./routers/purchaseEndPoints"
// import { sendEmail } from './otherApiServices/mailService';
// import { search } from './otherApiServices/googleBooksApi';
const app = express();
app.use(express.json());
app.use(cookieParser("token"));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(morgan("dev"));
app.use("/public", express.static(path.resolve('public')));
app.use(express.urlencoded({ extended: false }));
app.use("/books", authoriseUser);
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/review", authoriseUser);
app.use("/review", reviewRouters);
app.use("/user", authoriseUser)
app.use("/user",userRoutes)
app.use("/purchase", authoriseUser);
app.use("/purchase",purchaseRoutes )
async function connectToDb() {
    try {
        await mongoose.connect(config.get("Book_Hub_mongoDbConnectionString"));
        console.log("DataBase is connected");
        const PORT = config.get("Book_Hub_PORT") || 3000;
        app.listen(PORT, () => console.log(`Server Lintening on PORT :${PORT}`))
    } catch (error: any) {
        console.log(error.message);
    }
}
connectToDb();


app.get("/test", (req: Request, res: Response) => {
    res.send("hello!!!!!!!")
})
app.get("/home", authoriseUser, async (req: Request, res: Response) => {
    const user = await getUserFromRequest(req);
    if(!user) return res.send("You Dont exist");
    const populatedUser = await user.populate([{
        path : "books",
    }])
    
    res.render("home", {
        books : populatedUser.books 
    })
})
