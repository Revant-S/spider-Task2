import multer from "multer";

export class MulterUploadService {
    private storage : multer.StorageEngine;
    constructor(pathToSave: string) {
        console.log("MIDDLEWARE");
        
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, pathToSave)
            },
            filename: function (req, file, cb) {
                const fileName = (Date.now() + '-' + file.originalname)
                cb(null, fileName)
            }
        }
        )
    }

    getUploadMiddleWare() {
        return multer({ storage: this.storage })
    }
}

