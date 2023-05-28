import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { getAllCategories } from "../services/services";
import { getAllProducts } from "../services/services";
import { dataReducer, initialState } from "../reducer/dataReducer";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAllSneakers = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await getAllProducts();
      if (response.request.status === 200) {
        setLoading(false);
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
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
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
    <DataContext.Provider value={{ state, dispatch, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
