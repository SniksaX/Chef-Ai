import express, { Application } from 'express';
import cors from 'cors';
import { createClient, SanityClient } from '@sanity/client';
import router from './lib/router';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port: number = 4444;

const API_KEY_SANITY: string = process.env.API_SANITY || '';
const PROJECT_ID_SANITY: string = process.env.PROJECT_ID_SANITY || '';

const sanity: SanityClient = createClient({
    projectId: PROJECT_ID_SANITY,
    dataset: 'production',
    apiVersion: '2023-09-23',
    token: API_KEY_SANITY,
    useCdn: false,
});

const start = () => {
    try {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    } catch (e) {
        console.error('Error starting server:', e);
    }
};

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());

app.use('/api', router(sanity));

start();

export default sanity;