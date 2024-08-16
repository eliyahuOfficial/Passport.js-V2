import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import passport from '../config/passport';
import User from '../models/User';

class AuthController {

    login(req: Request, res: Response, next: NextFunction) {
        const platform = req.params.platform;

        passport.authenticate(platform, (err: any, user: any, info: { message: string }) => {
            if (err) {
                console.error(`Authentication error: ${err.message}`);
                return next(err);
            }
            if (!user) {
                console.warn(`Authentication failed for platform: ${platform}`);
                return res.status(401).json({ message: info ? info.message : 'Login failed' });
            }

            req.logIn(user, (err) => {
                if (err) {
                    console.error(`Login error: ${err.message}`);
                    return next(err);
                }
                console.log(`User logged in: ${user.email} on platform: ${platform}`);
                return res.json({ redirect: '/dashboard' });
            });
        })(req, res, next);
    }


    logout(req: Request, res: Response, next: NextFunction) {
        req.logout((err) => {
            if (err) {
                console.error(`Logout error: ${err.message}`);
                return next(err);
            }
            console.log('User logged out successfully');
            res.send('You have been logged out successfully.');
        });
    }


    dashboard(req: Request, res: Response) {
        if (!req.isAuthenticated()) {
            return res.status(401).send('You are not authenticated');
        }

        const user = req.user as any;

        const dashboards: Record<string, string> = {
            eCW: 'Welcome to the eCW dashboard',
            AMD: 'Welcome to the AMD dashboard',
            Quest: 'Welcome to the Quest dashboard',
            Behavidance: 'Welcome to the Behavidance dashboard',
            onntop: 'Welcome to the Onntop dashboard'
        };

        const message = dashboards[user.platform] || 'Welcome to the general dashboard';
        console.log(`Accessing dashboard: ${message}`);
        res.send(message);
    }


    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, platform, clinic, organizationId } = req.body;


            if (!email || !password || !platform || !clinic || !organizationId) {
                return res.status(400).json({ message: 'All fields are required.' });
            }


            const existingUser = await User.findOne({ email, platform });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists for this platform.' });
            }


            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email,
                password: hashedPassword,
                platform,
                clinic,
                organizationId: new mongoose.Types.ObjectId(organizationId),
            });

            await user.save();
            res.status(201).json({ message: 'User created successfully', user });
        } catch (err) {
            if (err instanceof Error) {
                console.error(`Error creating user: ${err.message}`);
                next(err);
            } else {
                console.error(`Unexpected error: ${err}`);
                next(new Error('An unexpected error occurred'));
            }
        }
    }

}

export default new AuthController();
