import User from '../models/User';
import bcrypt from 'bcrypt';

class AuthService {
    async createUser(email: string, password: string, platform: string, clinic: string, organizationId: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            platform,
            clinic,
            organizationId
        });
        await user.save();
        return user;
    }

    async validateUser(email: string, password: string, platform: string) {
        const user = await User.findOne({ email, platform });
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }
        return user;
    }
}

export default new AuthService();
