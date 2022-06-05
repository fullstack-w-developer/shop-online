import Image from "next/image";
import { useContext } from "react";
import { GoPlusSmall } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/router";
import { globalContext } from "../store/GlobalState";
import { MdDelete } from "react-icons/md";

const CardCartItems = ({ item }: { item: any }) => {
  const { dispatch, state } = useContext(globalContext);
  const { cart } = state;
  const router = useRouter();

  const decrease = () => {
    const newData = [...cart];
    newData.forEach((itemCart: any) => {
      if (itemCart._id === item._id) {
        itemCart.count -= 1;
      }
    });

    dispatch({
      type: "ADD_CART",
      payload: newData,
    });
  };
  const increase = () => {
    const newData = [...cart];
    newData.forEach((itemCart: any) => {
      if (itemCart._id === item._id) {
        itemCart.count += 1;
      }
    });

    dispatch({
      type: "ADD_CART",
      payload: newData,
    });
  };

  const deleteById = () => {
    const newData = cart.filter(
      (itemCart: any) => itemCart._id !== item._id
    );

    if (newData.length === 0) {
        localStorage.clear()
    }

    return dispatch({ type: "ADD_CART", payload: newData });
  };
  return (
    <div className=" border flex flex-col md:h-96 lg:h-80 lg:flex-row items-start gap-10 p-10 cursor-pointer">
      {/* right show info cart */}
      <div className="flex flex-col h-full justify-around ">
        <div className="relative w-14 h-14">
          <Image
            src={item.images[0]}
            objectFit="contain"
            layout="fill"
          />
        </div>
        <div className="flex items-center gap-2 text-[#1e272e]">
          <button onClick={() => increase()}>
            <GoPlusSmall size={20} />
          </button>
          <p className="text-xs">{item.count}</p>
          {item.count === 1 ? (
            <button
              onClick={() => deleteById()}
              className="text-red-600"
            >
              <MdDelete size={18} />
            </button>
          ) : (
            <button onClick={() => decrease()}>
              {" "}
              <FiMinus />
            </button>
          )}
        </div>
      </div>
      {/* left show info cart */}
      <div
        onClick={() => router.push(`/product/${item._id}`)}
        className="flex flex-col h-full justify-between"
      >
        <h1 className="font-bold text-[#1e272e] text-ellipsis flex-nowrap overflow-hidden">
          {item.title}
        </h1>
        <p
          className={`text-sm font-medium ${
            item.inStock < 5 && "text-red-500"
          }`}
        >
          inStock: {item.inStock}
        </p>
        <p className="text-sm font-medium ">
          price: $ {item.price}
        </p>
        <div className="flex justify-start items-center gap-1 mt-4">
          <AiFillStar className="text-yellow-400" />
          <p className="text-xs">{item.score}</p>
        </div>
        <p className="text-sm font-medium  text-justify">
          description: {item.description}
        </p>
      </div>
    </div>
  );
};

export default CardCartItems;
