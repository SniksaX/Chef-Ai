//Backend/server/lib/auth.ts
import express, { Router, Request, Response } from 'express';
import { SanityClient } from '@sanity/client';
import bcrypt, { hash } from 'bcrypt';
import passport from 'passport';
import { userInformation } from '../server';

const router: Router = express.Router();

async function HashPass(userlastName: string){
    try {
        if (userlastName){
            const hashedUser = await bcrypt.hash(userlastName , 10);
            return hashedUser;
        }
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default function Auth(sanity: SanityClient): Router {

    router.post('/middleware', async (req, res) => {
        const userlastName = userInformation.lastName;
        const userlastNameHashed = req.body.value; // Assuming the hashed name is sent back in a cookie
        if (userlastName && userlastNameHashed) {
            const result = await bcrypt.compare(userlastName, userlastNameHashed);
            if (result) {
                return res.status(200).json({success: true});
            } else {
                return res.status(403).json({success: false, message: "Access Denied"});
            }
        } else {
            return res.status(400).json({success: false, message: "Required data missing"});
        }
    });

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

    router.post('/userLogin', async (req, res, next) => { // Note the async here
        passport.authenticate('local', async (err: any, user: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password', type: 'invalidCredentials' });
            }
            req.logIn(user, async (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }
                const userlastNameHashed = await HashPass(user.lastName);
                req.session.cookie.maxAge = 24 * 60 * 60 * 3600;
                res.cookie('session', userlastNameHashed, { httpOnly: true }); // Make sure to set a string key for the cookie
                return res.status(200).json({ message: 'Login successful.' });
            });
        })(req, res, next);
    });

    router.post('/userLogout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout({}, (err) => {
                if (err) {
                    console.error('Logout error:', err);
                    return res.status(500).json({
                        error: 'Internal Server Error',
                        code: 500,
                        msg: 'Failed to log out.',
                    });
                }
                res.cookie('session', '', { expires: new Date(0), httpOnly: true });
                res.status(200).json({
                    msg: 'Logged out successfully',
                    code: 200,
                });
            });
        } else {
            res.status(403).json({
                error: 'Access Denied',
                code: 403,
                msg: 'You must be online and logged in to perform this action.',
            });
        }
    });

    return (router) ;
}
