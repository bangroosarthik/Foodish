
// import mongoose from "mongoose";
// import { User } from "../../../models/User";
// import bcrypt from 'bcrypt';
// export async function POST(req){
//   const body=await req.json();
//   mongoose.connect(process.env.MONGO_PROD_URI).then(()=>{
//     console.log("connection successfull");

//   }).catch((err)=>console.log(err));
//   const pass=body.password;
//   if(!pass.length || pass.length<5){
//     new Error('Password must be at least 5 characters');
//   }

//   const createdUser=await User.create(body);
//   return Response.json(createdUser);
// }

// import mongoose from "mongoose";
// import { User } from "../../../models/User";
// import bcrypt from 'bcrypt';

// export async function POST(req) {
//   const body = await req.json();

//   mongoose.connect(process.env.MONGO_PROD_URI).then(() => {
//     console.log("connection successful");
//   }).catch((err) => console.log(err));

//   if (body.googleAuth) {
//     // User registered with Google, handle accordingly
//     const createdUser = await User.create({
//       email: body.email,
//       name: body.name,
//       googleAuth: true, // Add a flag to indicate Google registration
//     });

//     return Response.json(createdUser);
//   } else {
//     // User registered with email and password
//     const pass = body.password;
//     console.log('password recieved: ',pass);
//     if (!pass.length || pass.length < 5) {
//       throw new Error('Password must be at least 5 characters');
//     }

//     try {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(pass, salt);

//       const createdUser = await User.create({
//         email: body.email,
//         name: body.name,
//         password: hashedPassword, // Assign the hashed password
//       });

//       return Response.json(createdUser);
//     } catch (error) {
//       console.error(error);
//       return Response.json({ error: 'Error creating user' }, { status: 500 });
//     }
//   }
// }



import mongoose from "mongoose";
import {User} from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();

    mongoose.connect(process.env.MONGO_PROD_URI);

    if (body.googleAuth) {
      const createdUser = await User.create({
        email: body.email,
        name: body.name,
        googleAuth: true,
      });

      return Response.json(createdUser);
    } else {
      const pass = body.password;
      if (!pass.length || pass.length < 5) {
        throw new Error('Password must be at least 5 characters');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pass, salt);

      const newUser = new User({
        email: body.email,
        name: body.name,
        password: hashedPassword,
      });

      const createdUser = await newUser.save();

      return Response.json(createdUser);
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json({ error: 'Error creating user' }, { status: 500 });
  }
}
