import mongoose from "mongoose";
import { IVolumeInfo } from "../TsTypes/bookTypes";
import {load } from 'cheerio';

const bookSchema = new mongoose.Schema<IVolumeInfo>({
    title : {
        type : String,
        required : true,
    },
    authors : {
        type : [String],
        required : true,
        validate : {
            validator : function(array) {return array.length > 0}
        }
    },
    publisher : {
        type : String,
        default : ""
    },
    description : {
        type : String,
        minlength : 10,
        required : true,
        trim : true
    },
    genere : {
        type : [String],
        default : []
    },
    imageLink : {
        type : String,
        default : "/public/bookImages/defaultImage"
    },
    likes : {
        type : Number,
        default : 0
    },
    reviews : {
        type : [{type : mongoose.Schema.Types.ObjectId , ref : "Reviews"}],
        default : []
    },
    apiId : {
        type : String,
        default : "User-Book"
    },
    cost : {
        type : {
            amount : Number,
            currencyCode : String
        },
        default : {
            amount : 0,
            currencyCode : "INR"
        }
    },
    previewUrl : {
        type : String,
        default : ""
    }
})
bookSchema.pre("save" , function(){
    const htmlDescription = this.description;
    const loaded = load(htmlDescription);
    this.description = loaded.text();
})





const Book = mongoose.model("Book" , bookSchema)

export default Book