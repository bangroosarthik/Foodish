import clientPromise from "@/libs/mongoConnect";
import * as mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import {User} from '@/models/User';
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"; 
import { UserInfo as UserInfoModel } from "@/models/UserInfo";
export const authOptions={
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
      GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        id:'credentials',
        credentials: {
          username: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          
          const email=credentials?.email;
          const password=credentials?.password;
          
          
          mongoose.connect(process.env.MONGO_PROD_URI);
          const user=await User.findOne({email});
          const passwordOK=user && bcrypt.compareSync(password,user.password);

          // console.log(passwordOK);
          if(passwordOK){
            return user;
          }

          
          return null
        }
      })
    ]
};

export async function isAdmin(){
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if(!userEmail){
    return false;
  }

  const userInfo = await UserInfoModel.findOne({email:userEmail});
  if(!userInfo){
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }