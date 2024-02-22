//backend/server/lib/router.ts
import express, { Router } from 'express';
import { SanityClient } from '@sanity/client';
import userDataSet from './userDataSet';
import GetImage from './getImage';
import AiStuff from './chef-ai';
import path from "path";

const router: Router = express.Router();

export default function createRouter(sanity: SanityClient): Router {

    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    router.use('/', userDataSet(sanity));
    router.use('/', AiStuff());
    router.use('/', GetImage());
    router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
    
    router.all('*', async (req, res) => {
        try {
            res.status(404).json({
                timestamp: Date.now(),
                msg: 'No route',
                code: 404,
            });
        } catch (e: any) {
            throw new Error(e);
        }
    });

    return router;
}