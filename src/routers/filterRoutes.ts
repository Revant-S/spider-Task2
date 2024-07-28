import { Router } from "express";
import { getFilterPage,getFilterResults } from "../controllers/filterControllers";

const router = Router();

router.get("/getFilterPage", getFilterPage)
router.get("/getFilteredBooks", getFilterResults)


export default router