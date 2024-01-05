import Trash from "@/app/components/icons/Trash";
import Image from "next/image";
import { cartProductPrice } from "../AppContext";
export default function CartProduct({product,index,onRemove}) {
  return (
    <div
      className="flex gap-4 mb-1  border-b py-4 items-center"
      key={product.id}
    >
      <div className="w-24">
        <Image
          src={product.image}
          alt={"Product image"}
          width={240}
          height={240}
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-500">
            Extras:
            {product.extras.map((extra) => (
              <div key={extra._id}>
                {extra.name} + ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-md font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-2"
        >
          <Trash />
        </button>
      </div>
      )}
      
      
    </div>
  );
}
