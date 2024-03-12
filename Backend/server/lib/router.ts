//backend/server/lib/router.ts
import express, { Router } from 'express';
import { SanityClient } from '@sanity/client';
import userDataSet from './userDataSet';
import GetImage from './getImage';
import Auth from './auth';


const router: Router = express.Router();

export default function createRouter(sanity: SanityClient): Router {

    router.use(express.json());
    router.use(express.urlencoded({ extended: true }));

    const requireAuth = (req: any, res: any, next: any) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(403).json({
                msg: "Access Denied",
                code: 403,
            });
        }
    }

    router.use('/', Auth(sanity))
    router.use('/', requireAuth, userDataSet(sanity));
    router.use('/', requireAuth ,GetImage());
    
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