import { createContext, useContext, useEffect, useReducer } from "react";
import { addToCartService } from "../services/cart-services/addToCartService";
import { getCartService } from "../services/cart-services/getCartService";
import { useAuth } from "./AuthContext";
import { getWishlistService } from "../services/wishlist-services/getWishlistService";
import { addToWishlistService } from "../services/wishlist-services/addToWishlistService";

const UserDataContext = createContext();

const initialUserData = {
  cartProducts: [],
  wishlistProducts: [],
};

const userDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART": {
      return { ...state, cartProducts: [...action.payload] };
    }

    case "SET_WISHLIST": {
      return { ...state, wishlistProducts: [...action.payload] };
    }

    default:
      return state;
  }
};

export function UserProvider({ children }) {
  const [userDataState, dispatch] = useReducer(
    userDataReducer,
    initialUserData
  );

  const { auth } = useAuth();

  const addToCartHandler = async (product) => {
    const response = await addToCartService(product, auth.token);

    dispatch({ type: "SET_CART", payload: response.data.cart });
  };

  const addToWishlistHandler = async (product) => {
    const response = await addToWishlistService(product, auth.token);

    dispatch({ type: "SET_WISHLIST", payload: response.data.wishlist });
  };

  const getCartProducts = async () => {
    try {
      const response = await getCartService(auth.token);
      dispatch({ type: "SET_CART", payload: response.data.cart });
    } catch (error) {}
  };

  const getWishlistProducts = async () => {
    try {
      const response = await getWishlistService(auth.token);
      dispatch({ type: "SET_WISHLIST", payload: response.data.wishlist });
    } catch (error) {}
  };

  useEffect(() => {
    getWishlistProducts();
    getCartProducts();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        userDataState,
        dispatch,
        addToCartHandler,
        addToWishlistHandler,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserData = () => useContext(UserDataContext);
