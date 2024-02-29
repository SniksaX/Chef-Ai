import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { detectPhotoIngredients } from './chef-ai';

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
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        FileName = file.fieldname + '-' + uniqueSuffix + ext;
        cb(null, FileName);
    }
});

const upload = multer({ storage, fileFilter });

export default function(): Router {    

    router.post('/pushImage', upload.array('file', 1), async (req: Request, res: Response) => {
        try {
            const files = req.files as Express.Multer.File[];
    
            if (!files || files.length === 0) {
                return res.status(400).send("No files uploaded.");
            }

            const detectionResult = await detectPhotoIngredients(files[0].filename);
            // const detectionResult = {
            //             content: `1. Carrots2. Zucchini 3. Eggs 4. Beef 5. Almonds 6. Walnuts`
            // }

            files.forEach((file, index) => {
                console.log(`File #${index + 1}:`, file);
            });

            res.status(200).json({ message: 'Files uploaded successfully.', detectionResult: detectionResult.content})

            // setTimeout(() => {
            //     res.status(200).json({ message: 'Files uploaded successfully.', detectionResult: detectionResult.content})
            // }, 10000)

            for (const file of files) {
                await fs.unlink(file.path).catch(console.error);
            }

        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred during the file upload.");
        }
    });

    return router;
}

