'use client';
import { useContext, useEffect,useState } from "react";
import { CartContext, cartProductPrice } from "@/app/components/AppContext";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { useParams } from "next/navigation";
import AddressInputs from "@/app/components/layout/AddressInput";
import { useProfile } from "@/app/components/UseProfile";
import CartProduct from "@/app/components/menu/CartProduct";
export default function OrderPage(){
    const {clearCart}= useContext(CartContext);
    const {id}= useParams();
    const [order,setOrder]=useState();
    const [address,setAddress]= useState({});
    const {data:profileData}=useProfile();
    const [loadingOrder,setLoadingOrder]=useState(true);

    useEffect(()=>{
        if(profileData?.city){
            const {phone,streetAddress, city,postalCode, country}= profileData;
            const addressFromProfile = {phone,streetAddress, city,postalCode, country};
            setAddress(addressFromProfile);
        }
    },[profileData])
    
    

    function handleAddressChange(propName,value){
        setAddress(prevAddress=> ({ ...prevAddress, [propName]:value
        }));
    }

    useEffect(()=>{
        if(typeof window.console !=="undefined"){
            if(window.location.href.includes('clear-cart=1')){
                clearCart();
            }
        }
        
        if(id){
            setLoadingOrder(true);
            fetch('/api/orders?_id='+id).then(res=>{
                res.json().then(orderData=>{
                    setOrder(orderData);
                    setLoadingOrder(false);
                })
            })
        }
    },[]);

    async function proceedToCheckout(ev) {
        ev.preventDefault();

        const promise = new Promise((resolve,reject)=>{
            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartProducts, address }),
            }).then(async (response)=>{
                if(response.ok){
                    resolve();
                    window.location=await response.json();
                }
                else{
                    reject();
                }
               
            });
        });

        await toast.promise(promise,{
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong... Please try again later',
        })

        
    }
    
    let subtotal=0;
    if(order?.cartProducts){
        for( const product of order?.cartProducts){
            subtotal+=cartProductPrice(product);
        }
    }
    

    return (
        <section className="max-w-2xl text-center mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Your Orders" />
                <div className="mt-4 mb-8">
                    <p>Order Details</p>
                    <p>We will call you when your order will be on the way ❤️</p>
                </div>
            </div>
            {loadingOrder && (
                <div>Loading order....</div>
            )}

            {order && (
                <div className="grid md:grid-cols-2 md:gap-16">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product.id} product={product} />
                        ))}
                        <div className="text-right py-2 text-gray-500">
                            Subtotal: <span className="text-black font-bold inline-block w-8">${subtotal} </span>
                            <br />
                            Delivery: <span className="text-black font-bold inline-block w-8">$5</span>
                            <br />
                            Total: <span className="text-black font-bold inline-block w-8">${subtotal+5}</span>
                            <br />
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className=" bg-gray-50 p-4 rounded-lg  mt-6">
                                    <form className="mt-2" onSubmit={proceedToCheckout}>
                                        
                                        <AddressInputs disabled={true} addressProps={address} setAddressProp={handleAddressChange}/>
                                        
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            

            
        </section>
    );
}