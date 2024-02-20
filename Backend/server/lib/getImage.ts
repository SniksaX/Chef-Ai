import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const router: Router = express.Router();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
        return cb(null, true);
    } else {
        cb(new Error("Error: File upload only supports the following filetypes - jpg, jpeg, png"));
    }
};

export let FileName = "";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        let n = 0
        cb(null, file.originalname);
        FileName = file.originalname;
    }
});

const upload = multer({ storage, fileFilter });

export default function(): Router {    

    router.post('/pushImage', upload.array('file', 10), (req: Request, res: Response) => {
       try{
           if (!req.files || req.files.length === 0) 
           return res.status(400).send("No files uploaded.");
        // else if (req.files.length > 10) 
        //     return res.status(400).send("You exceeded the max of 10 files");
        
        res.status(200).json({message: 'Files uploaded successfully.'});
       } catch (error) {
         console.error(error)
       }
    });

    return router;
}