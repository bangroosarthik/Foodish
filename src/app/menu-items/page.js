// 'use client';

// import { useProfile } from "../components/UseProfile";
// import Link from "next/link";
// import UserTabs from "../components/layout/UserTabs";
// import Right from "../components/icons/Right";
// import { useEffect, useState } from "react";


// export default function MenuItemsPage(){

//     const {loading,data}=useProfile();
//     const [menuItems,setMenuItems]=useState('');

//     useEffect(()=>{
//         fetch('/api/menu-items').then(res=>{
//             res.json().then(menuItems=>{
//                 setMenuItems(menuItems);
//             });
//         })
//     },[]);

//     if(loading){
//         return 'Loading User Info...';
//     }

//     if(!data.admin){
//         return 'Not an Admin!';
//     }
    
//     return (
//        <section className="mt-8 max-w-md mx-auto ">
//         <UserTabs isAdmin={true} />
        
//         <div className="mt-8 ">
//             <Link className="button" href={'/menu-items/new'}>
//                 <span>Create new menu item</span>
//                 <Right />
//             </Link>
//         </div>
//         <div>
//             <h2 className="text-sm text-gray-500 ">Edit menu-item: </h2>
//             {menuItems?.length>0 && menuItems.map(item =>{
//                 <button className="mb-1">
//                     {item.name}
//                 </button>
                
//             })}
//         </div>
//        </section>
//     );
// }

'use client';

import { useProfile } from "../components/UseProfile";
import Link from "next/link";
import UserTabs from "../components/layout/UserTabs";
import Right from "../components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
    const { loading, data } = useProfile();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            });
        })
    }, []);

    if (loading) {
        return 'Loading Menu Info...';
    }

    if (!data.admin) {
        return 'Not an Admin!';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto ">
            <UserTabs isAdmin={true} />

            <div className="mt-8 ">
                <Link className="button flex mb-3" href={'/menu-items/new'}>
                    <span>Create new menu item</span>
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu-item: </h2>
                <div className="grid grid-cols-4 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link  href={'/menu-items/edit/'+item._id} className="bg-gray-200 rounded-lg p-3 " key={item._id}>
                            <div className="relative">
                                <Image  className="rounded-md" src={item.image} alt={'menu-item-image'} width={200} height={100} />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
                
            </div>
        </section>
    );
}
