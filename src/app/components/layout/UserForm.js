'use client';
import AddressInputs from "./AddressInput";
import EditableImage from "./EditableImage";
import { useState } from "react";
export default function UserForm({user,onSave}){

    const [userName,setUserName]=useState(user?.userName || '');

    
    const [phone,setPhone]=useState(user?.phone || '');

    const [streetAddress,setStreetAddress]=useState(user?.streetAddress || '');
    const [city,setCity]=useState(user?.city || '');
    const [postalCode,setPostalCode]=useState(user?.postalCode || '');
    const [country,setCountry]=useState(user?.country || '');
    const [image,setImage]=useState(user?.image || '');

    function handleAddressChange(propName,value){
        if(propName==='phone') setPhone(value);
        if(propName==='streetAddress') setStreetAddress(value);
        if(propName==='postalCode') setPostalCode(value);
        if(propName==='country') setCountry(value);
        if(propName==='city') setCity(value);
        
    }
    return (
        <div className="md:flex gap-4 ">
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
                        <AddressInputs addressProps={{
                            phone,streetAddress,postalCode,city,country
                        }} setAddressProp={handleAddressChange}/>
                        <button type="submit">Save</button>
                    </form> 
                </div>
    );
}