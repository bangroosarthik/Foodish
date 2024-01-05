'use client';
import UserTabs from "@/app/components/layout/UserTabs";
import { useProfile } from "../components/UseProfile";
import { useEffect,useState } from "react";
export default function UsersPage(){
    const {loading,data}=useProfile();
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        fetch('/api/users').then(response=>{
            response.json().then(users=>{
                setUsers(users);
            });
        })
    },[]);

    if(loading)
    {
        return 'Loading User Page....';
    }
    
    if(!data.admin){
        return 'Not an Admin';
    }
    return (
        <section className="mt-8 max-w-2xl mx-auto ">
            <UserTabs isAdmin={true}/> 
            <h3 className="text-center mt-8">User Info</h3>
            <div className="mt-8">
                {users?.length >0 && users.map(user =>(
                    <div  key={user._id} className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4  grow">
                            <div className="text-gray-900">
                            {!!user.name && (<span>{user.name}</span>)}
                            {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            
                            <span className="text-gray-600">{user.email}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
     );
}