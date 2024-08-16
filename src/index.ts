import express from 'express';
import session from 'express-session';
import passport from './config/passport';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './middleware/logger';
import authRoutes from './routes/authRoutes';

dotenv.config({ path: './dev.env' });

const mongoUri = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/OonTopPoc';
const port = process.env.PORT || 8080;

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

const app = express();

app.use(logger);
app.use(express.json());
app.use(session({
    secret: process.env.JWT_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`App is running in ${process.env.NODE_ENV || 'development'} mode`);
});
