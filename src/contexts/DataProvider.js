import { createContext, useContext, useEffect, useReducer } from "react";

import { getAllCategories } from "../services/services";
import { getAllProducts } from "../services/services";

const DataContext = createContext();

export function DataProvider({ children }) {
  const initialState = {
    allProductsFromApi: [],
    allCategories: [],
  };

  const dataReducer = (state, action) => {
    switch (action.type) {
      case "GET_ALL_PRODUCTS_FROM_API":
        return { ...state, allProductsFromApi: action.payload };
      case "GET_ALL_CATEGORIES":
        return { ...state, allCategories: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const getAllSneakers = async () => {
    try {
      const response = await getAllProducts();
      if (response.request.status === 200) {
        dispatch({
          type: "GET_ALL_PRODUCTS_FROM_API",
          payload: [
            ...response.data.products
              .map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value),
          ],
        });
      }
    } catch (error) {}
  };

  const getCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.request.status === 200) {
        dispatch({
          type: "GET_ALL_CATEGORIES",
          payload: response.data.categories,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllSneakers();

    getCategories();
  }, []);

  return (
    <DataContext.Provider value={{ state }}>{children}</DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
