import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({ product }: { product: any }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/product/${product._id}`)}
      className="bg-white w-72 h-96  border-[.01rem] cardproduct cursor-pointer hover:border-[.09rem] "
    >
      <div className="flex justify-center items-center mt-4">
        <div className="relative w-[60%] h-56    ">
          <Image
            src={product.images[0]}
            objectFit="contain"
            layout="fill"
          />
        </div>
      </div>
      <div className="px-3">
        <h1 className="text-[#1e272e] font-medium text-lg text-ellipsis whitespace-nowrap overflow-hidden">
          {product.title}
        </h1>
        <div className="flex justify-between text-xs mt-10">
          <p className="text-[#1e272e] font-medium ">
            $ {product.price}
          </p>
          {product.inStock === 0 ? <p className="text-red-400 font-medium">out inStock</p> : <p>inStock: {product.inStock}</p>}
        </div>
        <div className="flex justify-end items-center gap-1 mt-4">
          <AiFillStar className="text-yellow-400" />
          <p className="text-xs">{product.score}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
