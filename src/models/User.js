// import bcrypt from 'bcrypt';
// import { model,models,Schema } from "mongoose";

// const UserSchema=new Schema ({
//     email:{type:String, required: true,unique:true},
//     password:{
//         type:String,
//         required: true,
//         validate:pass =>{
//             if(!pass?.length || pass.length <5){
//                 new Error('Password must be atleast 5 characters');
//                 return false;
//             }
            
//         },
//     },
// },{timestamps: true});

// UserSchema.post('validate',function(user){
//     const notHashed=user.password;
//     const salt = bcrypt.genSaltSync(10);
//     user.password = bcrypt.hashSync(notHashed, salt);
    
// });

// export const User=models?.User || model('User',UserSchema);


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

export const User = models?.User || model('User', UserSchema);

