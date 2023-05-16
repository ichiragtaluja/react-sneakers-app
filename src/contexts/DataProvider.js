import { createContext, useContext, useEffect, useReducer } from "react";

import { getAllCategories } from "../services/services";
import { getAllProducts } from "../services/services";
import { dataReducer, initialState } from "../dataReducer/dataReducer";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  console.log(state.filters.categories)

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
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
