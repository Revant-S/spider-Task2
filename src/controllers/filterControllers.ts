import { Request, Response } from "express";
import { searchForFilters } from "../otherApiServices/googleBooksApi";
import { FilterParams } from "../otherApiServices/googleBooksApi";
import { getUserFromRequest } from "./bookControllers";


export const getFilterPage = async (req: Request, res: Response) => {
    const user = await getUserFromRequest(req)
    res.render("filterPage", {
        filterRequired: true,
        user
    })
}


export const getFilterResults = async function (req: Request, res: Response) {
    const { author, genre, keyWord } = req.query;
    const parameter: FilterParams = {
        inauthor: author as string,
        subject: genre as string,
        keyWord : keyWord as string
    }
    const list = await searchForFilters(parameter);
    return res.json(list)
}