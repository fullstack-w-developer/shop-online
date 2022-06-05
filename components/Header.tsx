import { useContext } from "react";
import { FcShop } from "react-icons/fc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { globalContext } from "../store/GlobalState";
import Link from "next/link";
const Header = () => {
  const { state } = useContext(globalContext);
  const { cart, user } = state;

  return (
    <header className="w-full sticky top-0 left-0 z-50 bg-[#ffffff] flex justify-between px-4 md:px-10 h-[67px] items-center shadow-md">
      {/* header left */}
      <div>
        {/* logo */}
        <Link href="/">
          <div className="cursor-pointer">
            <FcShop size={35} />
          </div>
        </Link>
      </div>
      {/* header right */}
      <div className="flex  items-center gap-3">
        {/* cart */}
        <Link href="/cart">
          <div className="relative cursor-pointer">
            <AiOutlineShoppingCart
              size={23}
              color="#808e9b"
            />

            <span className="absolute -top-1 rounded-full px-1  text-white font-medium -right-1 text-[.60rem] bg-red-500">
              {cart.length}
            </span>
          </div>
        </Link>
        {/* user */}
        <div>
          {Object.keys(user).length > 0 ? (
            <p className="font-medium text-sm uppercase">
              {/* @ts-ignore */}
              {user.name}
            </p>
          ) : (
            <Link href="/login">
              <a>
                <BiUser
                  size={23}
                  color="#808e9b"
                  className="cursor-pointer"
                />
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
