import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import CardCartItems from "../components/CardCartItems";
import { globalContext } from "../store/GlobalState";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const { state } = useContext(globalContext);
  const { cart, user } = state;
  const router = useRouter();

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.count;
      }, 0);

      setTotal(res);
    };

    const getCount = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.count;
      }, 0);
      setCount(res);
    };

    getCount();
    getTotal();
  }, [cart]);

  const prefectShop = () => {
    if (Object.keys(user).length === 0) {
      router.push("/login");
    }
  };
  return (
    <div className="px-4 md:px-10 flex flex-col md:flex-row gap-4">
        <Head>
        <title>Cart | Mahdi-Shariflo</title>
      </Head>
      <div className="flex-[3] h-[80vh] overflow-auto container_card_cart ">
        {cart.length === 0 ? (
          <p className="text-center font-bold text-lg  my-10">
            your cart is empty
          </p>
        ) : (
          cart.map((item: any, index: number) => {
            return (
              <CardCartItems item={item} key={index} />
            );
          })
        )}
      </div>
      <div className=" md:flex-1 bg-gray-100 h-96 flex justify-between flex-col py-2">
        <h1 className="text-lg font-bold text-center">
          your Cart
        </h1>
        <div className="flex justify-between px-4 font-medium text-[#1e272e]">
          <span>Number of goods: </span>
          <span>{count}</span>
        </div>
        <div className="flex justify-between px-4 font-medium text-[#1e272e]">
          <span>price: </span>
          <span>$ {total}</span>
        </div>
        <div className="flex justify-center">
          <button
            onClick={prefectShop}
            className="w-[80%] bg-[#0096f5] text-white py-2 font-medium rounded-md"
          >
            prefect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
