// import { Request, Response } from "express";
// import { searchForFilters } from "../otherApiServices/googleBooksApi";
// import { params } from "../otherApiServices/googleBooksApi";


// export const getFilterPage = async (req: Request, res: Response) => {
//     res.render("filterPage")
// }


// export const getFilterResults = async function (req: Request, res: Response) {
//     const { author, genere, priceRange } = req.query;
//     let parameter : params = {}
//     if (author) parameter.inauthor = author as string;
//     if (genere) parameter.subject = genere as string;
   
//     const filterArray = searchForFilters({
//         params : parameter
//     });
// }