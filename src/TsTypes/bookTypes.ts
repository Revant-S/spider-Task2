import { Types } from "mongoose";

export interface IVolumeInfo  {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    genere: string[];
    averageRating: number;
    imageLink: string;
    language: string;
    likes : number,
    reviews : Types.ObjectId[]
};

export interface bookBody{
    bookName : string,
    authors : string,
    publisher? : string,
    Description : string
}