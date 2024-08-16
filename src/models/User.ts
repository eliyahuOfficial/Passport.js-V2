import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    platform: string;
    clinic: string;
    organizationId: mongoose.Schema.Types.ObjectId;
}

const userSchema: Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    platform: { type: String, enum: ['eCW', 'AMD', 'Quest', 'Behavidance', 'onntop'], required: true },
    clinic: { type: String, required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
