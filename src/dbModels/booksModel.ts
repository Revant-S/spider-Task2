import mongoose from "mongoose";
import { IVolumeInfo } from "../TsTypes/bookTypes";

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
    }
})

const Book = mongoose.model("Book" , bookSchema)

export default Book