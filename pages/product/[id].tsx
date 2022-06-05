import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { getProductById } from "../../utils/API";
import { AiFillStar } from "react-icons/ai";
import { globalContext } from "../../store/GlobalState";

const ProductId = ({ product }: { product: any }) => {
  const { state, dispatch } = useContext(globalContext);
  const [error, setError] = useState("");
  const { cart } = state;
  const [tab, setTab] = useState(0);

  const addToCart = () => {
    if (product.inStock === 0)
      return setError("this product is not in stock");
    const checkCart = cart.every(
      (item: any) => item._id !== product._id
    );

    if (!checkCart)
      return setError(
        "This product alraay exist your cart"
      );

    dispatch({
      type: "ADD_CART",
      payload: [...cart, { ...product, count: 1 }],
    });
  };

  useEffect(() => {
    const clearError = setTimeout(() => {
      setError("");
    }, 3000);

    if (error) {
      //  @ts-ignore
      clearError;
    }
    return () => {
      // @ts-ignore
      clearTimeout(clearError);
    };
  }, [error]);
  return (
    <div className="flex flex-col items-center md:flex-row px-5 md:px-10 justify-center md:items-start gap-10">
      <div className="w-[90%] md:w-fit">
        {/* images */}
        <div className="relative w-[100%] lg:w-96 h-96">
          <Image
            src={product.images[tab]}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="flex  gap-2  w-fit mt-6">
          {product.images.map(
            (image: string, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => setTab(index)}
                  className={`relative w-16 h-16 cursor-pointer ${
                    index === tab &&
                    "border-2  border-orange-300 rounded"
                  }`}
                >
                  <Image
                    src={image}
                    objectFit="contain"
                    layout="fill"
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
      {/* info */}
      <div className="flex-1">
        <h1 className="font-bold border-b pb-2  text-xl text-[#1e272e]">
          {product.title}
        </h1>

        {/* more info */}
        <div className=" flex flex-col text-sm font-medium gap-3 mt-4">
          <h5> price: ${product.price}</h5>
          <h5>inStock: {product.inStock}</h5>
          <h5 className="text-lg">
            description:{" "}
            <span className="text-[#808e9b] text-sm">
              {" "}
              {product.description}
            </span>
          </h5>
          <div className="flex justify-end items-center gap-1 mt-4">
            <AiFillStar className="text-yellow-400" />
            <p className="text-xs">{product.score}</p>
          </div>
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
          <button
            onClick={() => addToCart()}
            className="bg-[#0096f5] bg-center transition-all hover:bg-[#027fd2] active:bg-[#3192ce] active:transition-all text-white w-fit px-10 py-2 font-medium rounded-md"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  const product: any = await getProductById({ id });

  return {
    props: { product: product.data.product }, // will be passed to the page component as props
  };
}
export default ProductId;
