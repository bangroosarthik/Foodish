import bcrypt from 'bcrypt';
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name:{type:String},
    image:{type:String},
    email: { type: String, required: true, unique: true },
    password: {type: String, required:true},
    
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    // Only hash the password if it is modified (or is new)
    console.log('Inside pre-save middleware');
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

const User = models?.User || model('User', UserSchema);
export default User;
