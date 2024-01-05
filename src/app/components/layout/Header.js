"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useContext,useState } from "react";
import ShoppingCart from "@/app/components/icons/ShoppingCart";
import { CartContext } from "../AppContext";
import Bars from "@/app/components/icons/Bars";

function AuthLinks({status,userName}){
  if(status==='authenticated'){
    return (
      <>
        <Link className="whitespace-nowrap" href={"/profile"}>
          Hello, {userName}
        </Link>
        <button onClick={()=> signOut()} className="bg-primary rounded-full text-white px-7 py-2">Logout</button>
      </>
    );
  }
  
  if(status==='unauthenticated'){
    return(
      <>
        <Link href={'/login'} className="  text-gray-900 ml-2 px-3 py-2">Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-7 py-2">Register</Link>
      </>
    );
  }    
}


export default function Header(){
  const session=useSession();
  console.log(session);
  const status=session?.status;
  const userData=session.data?.user;
  let userName=userData?.name || userData?.email;
  const {cartProducts}= useContext(CartContext);
  const [mobileNavOpen,setMobileNavOpen]=useState(false);
  
  if(userName && userName.includes(' ')){
    userName=userName.split(' ')[0];
  }

  

    return (

        <header>
          <div className="flex items-center md:hidden justify-between">
            <Link className="text-primary font-semibold text-2xl" href='/'>FOODISH</Link>
            <div className="flex gap-6 items-center">
              <Link className="relative" href={'/cart'}><ShoppingCart /><span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">{cartProducts.length}</span></Link>     
              <button className="p-1 border" onClick={()=>setMobileNavOpen(prev=> !prev)}>
                <Bars />
              </button>
            </div>
          </div>

          {mobileNavOpen && (
            <div onClick={()=> setMobileNavOpen(false)} className="md:hidden p-4 bg-gray-100  rounded-lg mt-2 flex flex-col gap-2 text-center border">
                <Link href={'/'}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>
                <AuthLinks status={status}  userName={userName} />
            </div>
          )}

          <div className="hidden md:flex items-center justify-between " >
                <nav className="flex items-center gap-6 text-gray-500 font-semibold">
                <Link className="text-primary font-semibold text-2xl" href='/'>FOODISH</Link>
                <Link href={'/'}>Home</Link>
                <Link href={'/menu'}>Menu</Link>
                <Link href={'/#about'}>About</Link>
                <Link href={'/#contact'}>Contact</Link>
              </nav>
              <nav className="flex items-center gap-4 text-gray-500">
                <AuthLinks status={status} userName={userName} />
                <Link className="relative" href={'/cart'}><ShoppingCart /><span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">{cartProducts.length}</span></Link>     
              </nav>
          </div>
      </header>
    );
}