//Backend/server/lib/auth.ts
import express, { Router, Request, Response } from 'express';
import { SanityClient } from '@sanity/client';
import bcrypt from 'bcrypt';
import passport from 'passport';

const router: Router = express.Router();

export default function Auth(sanity: SanityClient): Router {

    router.post('/userSignIn', async (req: Request, res: Response) => {
        const { firstName, lastName, phone, age, email, password } = req.body;
        try{
            const userExists = await sanity.fetch('*[_type == "userData" && email == $email]', { email });
            if (userExists.length > 0) {
                return res.status(400).json({ error: 'User with this email already exists', type: 'userExists' });
            }

            if (password.length < 6 || !/(?=.*[A-Z])(?=.*\d)/.test(password)) {
                return res.status(400).json({
                    error: 'Password must be at least 6 characters long and contain at least one uppercase letter and one digit',
                    type: 'invalidPassword'
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                _type: 'userData',
                email,
                firstName,
                lastName,
                phone,
                age,
                password: hashedPassword
            };
            await sanity.create(newUser);
            return res.status(200).json({ message: `User registered successfully`, user: newUser });
        } catch (error) {
            console.error('User registration error:', error);
            res.status(500).json({ error: 'Registration failed', type: 'serverError' });
        }
    });

    router.post('/userLogin', (req: Request, res: Response, next: any) => {
        passport.authenticate('local', async (err: any, user: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password', type: 'invalidCredentials'  });
            }
            req.logIn(user, async (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }
                req.session.userData = { email: user.email, lastName: user.lastName };
                req.session.cookie.maxAge = 24 * 60 * 60 * 3600;
                return res.status(200).json({ message: 'Login successful.' });
            });
        })(req, res, next);
    });

    return (router) ;
}
