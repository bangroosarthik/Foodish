import EditableImage from "@/app/components/layout/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "@/app/components/layout/MenuItemPriceProps";
export default function MenuItemForm({onSubmit,menuItem}){
    const [image, setImage]=useState(menuItem?.image || '');
    const [name,setName]=useState(menuItem?.name || '');
    const [description,setDescription]=useState(menuItem?.description || '');
    const [basePrice,setBasePrice]=useState(menuItem?.basePrice || '');
    const [sizes,setSizes]=useState(menuItem?.sizes || []);
    const [extraIngredientPrices,setExtraIngredientPrices]=useState(menuItem?.extraIngredientPrices || []);
    const [category,setCategory]=useState(menuItem?.category || '');
    const [categories,setCategories]=useState([]);
    
    
    useEffect(()=>{
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories);
            });
        });
    },[]);
    
    return (
        <form onSubmit={ev=>onSubmit(ev,{image,name,description,basePrice,sizes,extraIngredientPrices,category,})} className="mt-8 max-w-2xl mx-auto " >
            <div className="md: grid items-start gap-4" style={{gridTemplateColumns:'.3fr .7fr'}}>
                <div className="p-2 rounded-lg realative max-w-[150px]">
                    <EditableImage link={image} setLink={setImage}/>
                </div>
                <div className="grow">
                    <label >Item name</label>
                    <input type="text" placeholder="Add Item Name" value={name} onChange={ev=>setName(ev.target.value)} />
                    <label>Description</label>
                    <input type="text" placeholder="Add Description" value={description} onChange={ev=>setDescription(ev.target.value)}/>
                    <label >Category</label>
                    <select value={category} onChange={ev=> setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c=>(
                            <option value={c._id} key={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <label> Base Price</label>
                    <input type="text" placeholder="Add Base Price"  value={basePrice} onChange={ev=>setBasePrice(ev.target.value)}/>
                    <MenuItemPriceProps name={'Extra ingredients'} addLabel={'Add ingredients prices '} props={extraIngredientPrices} setProps={setExtraIngredientPrices}/>
                    <button type="submit">Save</button>
                </div>
               
            </div>
            </form>
    );
}