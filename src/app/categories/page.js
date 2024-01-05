"use client";
import UserTabs from "@/app/components/layout/UserTabs";
import {useProfile} from "@/app/components/UseProfile";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DeleteButton from "../components/DeleteButton";
export default function CategoriesPage(){

    const [categoryName,setCategoryName]=useState('');
    const [categories,setCategories]=useState([]);
    const {loading:profileLoading,data:profileData}=useProfile(); 
    const [editedCategory,setEditedCategpry]=useState(null);
    useEffect(()=>{
        fetchCategories();
    },[]);

    function fetchCategories(){
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories);
            });
        }); 
    }

    async function handleDeleteClick(_id){
        const promise= new Promise(async (resolve,reject)=>{
            const response=await fetch('/api/categories?_id='+_id,{
                method: 'DELETE',
            });
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        });

        fetchCategories();

        await toast.promise(promise,{
            loading:'Deleting....',
            success:'Deleted ',
            error: 'Error',
        });

        
    }

    if(profileLoading){
        return 'Loading Categories Info...';
    }
    if(!profileData.admin){
        return 'Not an Admin';
    }

    async function handleCategorySubmit(ev){
        ev.preventDefault();

        const creationPromise=new Promise(async (resolve,reject)=>{
            
            const data= {name:categoryName};
            if(editedCategory){
                data._id = editedCategory._id;
            }
            
            const response= await fetch('/api/categories',{
                method: editedCategory ? 'PUT' : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategpry(null); 
            if(response.ok){
                resolve()
            }
            else{
                reject()
            }
        });
        await toast.promise(creationPromise,{
            loading:editedCategory? 'Updating Category!!!!': 'Creating Your New Category!!',
            success: editedCategory ? 'Category Updated ' : 'Category created',
        });
        
    }
    return(
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true}/>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
            <div className="flex gap-2 items-end">
                <div className="grow">
                <label>{editedCategory ? 'Update Category' : 'New Category Name'}
                    {editedCategory && (
                    <>: <b>{editedCategory.name}</b></>
                    )}
                </label>
                    <input type="text" value={categoryName} onChange={ev=> setCategoryName(ev.target.value)}/>
                </div>
                <div className="pb-2 flex gap-2">
                    <button type="submit">{editedCategory ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={()=>{ setEditedCategpry(null); setCategoryName('');}}>Cancel</button>
                </div>
            </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing Category: </h2>
                {categories?.length > 0 && categories.map((c, index) => (
                    <div   key={index} className=" bg-gray-100 rounded-xl p-2 px-4 flex gap-1  mb-1 items-center">
                        <div className=" grow cursor-pointer" >
                            {c.name}
                        </div>
                        <div className=" flex gap-3  ">
                            <button className="button" onClick={()=>{setEditedCategpry(c); setCategoryName(c.name);}}>
                                Edit
                            </button>
                            <DeleteButton label="Delete" onDelete={()=> handleDeleteClick(c._id)}/>
                        </div>
                    </div>
                ))}

            </div>

        </section>
    );
}