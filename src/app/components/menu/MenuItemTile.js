
export default function MenuItemTile({onAddToCart, ...item}){
    const {image, description,name,basePrice}=item;
    
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transtion-all">
                <div className="text-center">
                    <img className=" max-h-24 block mx-auto" src={image} alt="peppironni" />
                </div>
                <h4 className="text-semibold text-xl my-2">{name}</h4>
                <p className="text-gray-500 text-sm line-clamp-3 ">{description}</p>
                <button onClick={onAddToCart} className="bg-primary text-white rounded-full px-6 py-1 mt-2">Add to cart  ${basePrice}</button>
        </div>
    );
}