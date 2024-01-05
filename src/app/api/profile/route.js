import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {User} from '@/models/User';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserInfo } from "@/models/UserInfo";
export async function PUT(req){
    mongoose.connect(process.env.MONGO_PROD_URI);
    const data=await req.json();
    const {name, image, password,...otherUserInfo}=data;
    const session=await getServerSession(authOptions);
    // console.log(session);
    if (!session || !session.user) {
        return Response.json({ error: "User not authenticated" }, { status: 401 });
    }

    const email=session.user.email;

    try {
        await User.updateOne({email},{name,image}); 
        
        await UserInfo.findOneAndUpdate({email},otherUserInfo,{upsert:true});
        if(req.session){
            req.session.user={
                ...req.session.user,
                name:name,
                password:password,
                image:image,
            };
            await session.save();
        }
        return Response.json(true);
    } catch(err){
        return Response.json({error: 'internal error'});
    }
}

export async function GET(){
    mongoose.connect(process.env.MONGO_PROD_URI);
    const session=await getServerSession(authOptions);
    const email=session?.user?.email;
    if(!email){
        return Response.json(null);
    }
    
    const user=await User.findOne({email}).lean();
    const userInfo=await UserInfo.findOne({email}).lean();
    
    return Response.json(
        {...user, ...userInfo}
    );

}