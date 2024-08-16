import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/User';

const createStrategy = (platform: string) => {
    return new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email, platform });
                if (!user) {
                    return done(null, false, { message: `Incorrect email or password for ${platform}.` });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: `Incorrect email or password for ${platform}.` });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    );
};

const platforms = ['eCW', 'AMD', 'Quest', 'Behavidance', 'onntop'];

platforms.forEach(platform => {
    console.log(`Loading strategy for platform: ${platform}`);
    passport.use(platform, createStrategy(platform));
});

passport.serializeUser((user, done) => {
    done(null, (user as any).id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
