import Action from "./Actions";

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case Action.ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case Action.USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
