"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";

import toast from "react-hot-toast";
import EditableImage from "../components/layout/EditableImage";
export default function ProfilePage(){
    const session=useSession();
    const [userName,setUserName]=useState('');

    const {status}=session;
    const [phone,setPhone]=useState('');

    const [streetAddress,setStreetAddress]=useState('');
    const [city,setCity]=useState('');
    const [postalCode,setPostalCode]=useState('');
    const [country,setCountry]=useState('');
    const [isAdmin,setIsAdmin]=useState('false');
    const [image,setImage]=useState('');
    
    useEffect(()=>{
        if(status=='authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response=>
                response.json()).then(data=>{
                    if(data){
                        setPhone(data.phone);
                        setStreetAddress(data.streetAddress);
                        setPostalCode(data.postalCode);
                        setCity(data.city);
                        setCountry(data.country);
                        setIsAdmin(data.admin);
                    }
                    else{

                    }
            }).catch(err=>{
                console.log(err);
            });
        }
    },[session,status]);
    
    if(status==='loading'){
        return 'Loading...';
    }
    if(status==='unauthenticated'){
        return redirect('/login');
    }
    
    

    async function handleProfileInfoUpdate(ev){
            
            ev.preventDefault();
            
            const savingPromise=new Promise(async(resolve,reject)=>{
                const response=await fetch('/api/profile',{
                    method: 'PUT',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({name:userName,image,streetAddress,phone,postalCode,city,country}),
            });
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
            toast.success('Saved!');
        });
    }


    

    return (
        <section className="mt-6">
            <UserTabs />
            <h1 className="text-center text-primary text-4xl mb-4">
            </h1>
            <div className="max-w-2xl mx-auto  " >
                
                <div className="flex gap-4 ">
                    <div >
                        <div className=" p-2 rounded-lg relative max-w-[150px]">
                            <EditableImage link={image} setLink={setImage} />
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label >First and Last Name</label>
                        <input type="text" placeholder="First and Last Name"  value={userName} onChange={ev=> setUserName(ev.target.value)}/>
                        <label >Email</label>
                        <input type="email" placeholder="email" disabled={true} value={session.data.user.email}/>
                        <label >Phone Number</label>
                        <input type="tel" placeholder="Phone Number"  value={phone} onChange={ev=>setPhone(ev.target.value)} />
                        <label >Street Address</label>
                        <input type="text" placeholder="Street Address" value={streetAddress} onChange={ev=>setStreetAddress(ev.target.value)}/>
                        <div className="flex gap-2">
                            <div>
                            <label >Postal code</label>
                            <input style={{'margin':'0'}} type="text" placeholder="Postal Code" value={postalCode} onChange={ev=>setPostalCode(ev.target.value)} />
                            </div>
                            <div>
                            <label>City</label>
                            <input style={{'margin':'0'}} type="text" placeholder="City" value={city} onChange={ev=>setCity(ev.target.value)}/>
                            </div>
                            
                        </div>
                        <label>Country</label>
                        <input type="text" placeholder="Country" value={country} onChange={ev=>setCountry(ev.target.value)}/>
                        <button type="submit">Save</button>
                    </form> 
                </div>
            </div>
        </section>
    );
}