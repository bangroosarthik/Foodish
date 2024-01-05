'use client';
import MenuItemTile from "@/app/components/menu/MenuItemTile";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MenuItem(menuItem){
    const {
        image,name,description,basePrice,sizes,extraIngredientPrices,
    }= menuItem;

    const {addToCart}=useContext(CartContext);
    const [showPopup,setShowPopup]=useState(false);
    const[selectedSize,setSelectedSize]=useState(sizes?.[0] || null);
    const [selectedExtras,setSelectedExtras]=useState([]);

    async function handleAddToCartButtonClick(){
            const hasOptions= sizes.length>0 && extraIngredientPrices.length > 0;
            if(hasOptions && !showPopup){
                setShowPopup(true);
                return;
            }
            addToCart(menuItem, selectedSize,selectedExtras);
            await new Promise(resolve=> setTimeout(resolve,1000));
            setShowPopup(false);
            toast.success('Added To cart!');
        
    }

    function handleExtraThingClick(ev,extraThing){
        const checked=ev.target.checked;
        if(checked){
            setSelectedExtras(prev=>[...prev, extraThing]);
        }
        else{
            setSelectedExtras(prev=> { return prev.filter(e=>e.name !==extraThing.name);
        });
        }
    }


    let selectedPrice= basePrice;
    if(selectedSize){
        selectedPrice+=selectedSize.price;
    }

    if(selectedExtras?.length > 0 ){
        for(const extra of selectedExtras){
            selectedPrice+=extra.price;
        }
    }

    console.log(selectedSize,selectedExtras);

    return( 
        <>
            {showPopup && (
                <div onClick={()=> setShowPopup(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div onClick={ev=> ev.stopPropagation()}
                         className="bg-white p-3 rounded-lg max-w-md  ">
                        <div className="overflow-y-scroll p-3" style={{maxHeight: 'calc(100vh -100px' }} >
                        <Image className="mx-auto" src={image} alt={name}  width={300} height={200} />
                       <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                       <p className="text-center text-gray-500 text-sm mb-2 ">{description}</p>
                       
                       
                       {extraIngredientPrices?.length >0 && (
                            <div className=" py-2 ">
                                <h3 className="text-center text-gray-800 mb-2">Any Extras?</h3>
                                
                                {extraIngredientPrices.map((extraThing) => (
                                    <label key={extraThing._id} className="flex items-center p-3 border gap-2 rounded-md mb-1">
                                        <input type="checkbox" name={extraThing.name} onChange={ev=> handleExtraThingClick(ev,extraThing)} checked={selectedExtras.map(e=>e._id).includes(extraThing._id)}/>
                                        {extraThing.name} + ${extraThing.price}
                                    </label>
                                    ))}
                            </div>
                       )}
                       <button className="bg-primary text-white sticky bottom-2 mb-2" type="button" onClick={handleAddToCartButtonClick}> Add to cart  ${selectedPrice} </button>
                       <button onClick={()=> setShowPopup(false)}>Cancel</button>
                        </div>
                      
                    </div>
                </div>
            )}

            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem}/>
            
        </>
    );
};