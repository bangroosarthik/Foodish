'use client';
import UserTabs from "@/app/components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "@/app/components/UseProfile";
import Link from "next/link";
import {redirect, useParams} from "next/navigation";
import MenuItemForm from "@/app/components/layout/MenuItemForm";
import DeleteButton from "@/app/components/DeleteButton";

export default function EditMenuItemPage(){

    const {id}= useParams();
    
    const {loading, data}= useProfile();
    const [menuItem,setMenuItem]=useState(null);
    const [redirectToItems,setRedirectToItems]=useState(false);

    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(items=>{
                const item= items.find(i=> i._id=== id);
                setMenuItem(item);
            });
        })
    },[]);

    if(loading){
        return 'Loading Menu info....';
    }
    if(!data.admin){
        return 'Not an admin';
    }

    

    async function handleFormSubmit(ev,data){
        ev.preventDefault();
        data={...data,_id:id};
        const savingPromise=new Promise(async (resolve,reject)=>{
            const response= await fetch('/api/menu-items',{
                method:'PUT',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'},
            }); 
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        });

        
        await toast.promise(savingPromise,{
            loading:'Saving this tasty item..',
            success:'Saved!',
            error:'Error!',
        });
        
        setRedirectToItems(true);
    }

    async function handleDeleteClick(){
        const promise=new Promise(async (resolve,reject)=>{
            const response=await fetch('/api/menu-items?_id='+id,{
                method:'DELETE',
            });
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        });
        
        await toast.promise(promise,{
            loading:'Deleting...',
            status:'Deleted!',
            error:'Error!',
        })
        
    }
    if(redirectToItems){
        return redirect('/menu-items');
    }
    
    
    
    if(loading){
        return 'loading all Menu Items...';

    }
    if(!data.admin){
        return 'Not an Admin';
    }



    return (
        <section className="mt-8">
        <UserTabs isAdmin={true}/>
        <div className="max-w-2xl mx-auto mt-8 ">
            <Link className="button" href={'/menu-items'}><span>Show all menu items </span> </Link>
        </div>
        <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
        <div className="max-w-md mx-auto mt-2">
            <div className="max-w-xs text-center ml-auto pl-4 ">
                <DeleteButton label={"Delete this menu item"} onDelete={handleDeleteClick} />
            </div>
        </div>
        </section>
    );
} 