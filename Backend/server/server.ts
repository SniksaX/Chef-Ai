//Backend/server/server.ts

import express, { Application } from 'express';
import session from 'express-session';
import cors from 'cors';
import { createClient, SanityClient } from '@sanity/client';
import router from './lib/router';
import dotenv from 'dotenv';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';


dotenv.config();

const app: Application = express();
const port: number = 4444;

const API_KEY_SANITY: string = process.env.API_SANITY || '';
const PROJECT_ID_SANITY: string = process.env.PROJECT_ID_SANITY || '';
const SECRET_KEY1: string = process.env.SECRET_KEY1 || '';
const SECRET_KEY2: string = process.env.SECRET_KEY2 || '';

const sanity: SanityClient = createClient({
    projectId: PROJECT_ID_SANITY,
    dataset: 'production',
    apiVersion: '2023-09-23',
    token: API_KEY_SANITY,
    useCdn: false,
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'SECRET_KEY2',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  }));

app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await sanity.fetch('*[_type == "account" && _id == $id][0]', { id });
        if (!user) {
            return done(new Error('User not found'), null);
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
});

passport.use('local', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const user = await sanity.fetch('*[_type == "userData" && email == $email][0]', { email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return done(null, false, { message: 'Invalid email or password' });
            }
            console.log(user)
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));


const start = () => {
    try {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    } catch (e) {
        console.error('Error starting server:', e);
    }
};

app.use('/api', router(sanity));

start();

export default sanity;