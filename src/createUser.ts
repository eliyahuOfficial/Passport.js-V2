import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User';
import dotenv from 'dotenv';

dotenv.config({ path: './dev.env' });

const mongoUri = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/default-db';

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

async function createUser(email: string, password: string, platform: string, clinic: string, organizationId: mongoose.Types.ObjectId) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        password: hashedPassword,
        platform,
        clinic,
        organizationId
    });
    await user.save();
    console.log('User created:', user);
}



createUser('example@ecw.com', 'password123', 'eCW', 'clinic1', new mongoose.Types.ObjectId())
    .then(() => {

        return createUser('example@behavidance.com', 'password123', 'Behavidance', 'clinic1', new mongoose.Types.ObjectId());
    })
    .then(() => mongoose.disconnect())
    .catch(err => console.error(err));
