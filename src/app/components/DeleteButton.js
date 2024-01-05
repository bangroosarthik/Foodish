import { useState } from "react";

export default function DeleteButton({label,onDelete}){
    const [showConfirm,setShowConfirm]=useState(false);

    if(showConfirm){
        return (
            <div className="fixed bg-black/80 inset-0 flex  items-center  justify-center ">
                <div className=" bg-white p-4 rounded-lg ">
                    <div className="text-center">Are you sure you want to delete?</div>
                    <div className="flex gap-2 mt-1">
                        <button type="button" onClick={()=>setShowConfirm(false)}>Cancel</button>
                        <button type="button" onClick={()=> {onDelete(); setShowConfirm(false)}} className="primary bg-primary text-white">Yes, delete!</button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <button type="button" onClick={()=> setShowConfirm(true)}>
            {label}
        </button>
    );
}