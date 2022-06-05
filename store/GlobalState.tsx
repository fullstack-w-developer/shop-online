import axios from "axios";
import { useRouter } from "next/router";
import React, {
  createContext,
  useReducer,
  useEffect,
} from "react";
import { generateTokenApi } from "../utils/API";
import { reducer } from "./reducer";

type ProductType = {
  id: number;
  name: string;
  price: number;
  count: number;
  title: string;
  inStock: number;
  scores: number;
  description: string;
};

type InitialStateType = {
  cart: ProductType[];
  user: {};
};

const initialState = {
  cart: [],
  user: {},
};
export const globalContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
export const GlobalState = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { cart, user } = state;
  const router = useRouter();
  useEffect(() => {
    const cartLocalStorage = localStorage.getItem("cart");
    if (cartLocalStorage) {
      // @ts-ignore
      dispatch({
        type: "ADD_CART",
        payload: JSON.parse(cartLocalStorage),
      });
    }
  }, []);
  useEffect(() => {
    // only store the state if products exists and it's length is greater than 0
    if (cart?.length)
      localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      generateTokenApi()
        .then((res: any) => {
          dispatch({
            type: "USER_INFO",
            payload: res.data.user,
          });
        })
        .catch((err: any) => {});
    }
  }, []);

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};
