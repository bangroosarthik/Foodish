'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
export default function HomeMenu(){
    const [bestSellers,setBestSellers]= useState([]);
    useEffect(()=>{
        fetch('/api/menu-items').then(res=> {
            res.json().then(menuItems=>{
                const bestSellers = menuItems.slice(-6);
                setBestSellers(bestSellers);
            });
        });
    },[]);

    return (
        <section >
            <div className=" absolute left-0 right-0 w-full justify-start">
                <div className="h-48 w-48 absolute  -left-10 -top-20 -z-10" >
                    <Image src={'/sallad1.png'} alt={'salad'} layout={"fill"} objectFit={"contain"}></Image>
                </div>
                <div className="h-48   absolute  -top-40 right-0 -z-10">
                    <Image src={'/sallad2.png'} alt={'salad'} height={195} width={107}></Image>
                </div>
            </div>
                <hr />
                <SectionHeaders  subHeader={'CHECK OUT '} mainHeader={'Our Best Sellers'}/>
                <hr />
            <div className=" grid sm:grid-cols-3 gap-4 py-4">
                {bestSellers?.length >0 && bestSellers.map(item=>(
                    <MenuItem key={item._id} {...item} />
                ))}
            </div>
        </section>
    );
}