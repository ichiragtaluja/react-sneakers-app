export const initialState = {
  allProductsFromApi: [],
  allCategories: [],
  inputSearch: "",
  filters: {
    rating: "",
    categories: [],
    price: [],
    sort: "",
  },
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS_FROM_API":
      return { ...state, allProductsFromApi: action.payload };

    case "GET_ALL_CATEGORIES":
      return { ...state, allCategories: action.payload };

    case "SEARCH":
      return { ...state, inputSearch: action.payload };

    case "ADD_RATINGS":
      return {
        ...state,
        filters: { ...state.filters, rating: action.payload },
      };

    case "ADD_CATEGORIES": {
      const isCategoryPresent = state.filters.categories.find(
        (category) => category === action.payload
      );

      return {
        ...state,
        filters: {
          ...state.filters,
          categories: isCategoryPresent
            ? state.filters.categories.filter(
                (category) => category !== action.payload
              )
            : [...state.filters.categories, action.payload],
        },
      };
    }

    case "ADD_SORT":
      return {
        ...state,
        filters: { ...state.filters, sort: action.payload },
      };

    case "ADD_PRICE": {
      const isPricePresent = state.filters.price.find(
        (price) => price.min === action.payload.min
      );
      return {
        ...state,
        filters: {
          ...state.filters,
          price: isPricePresent
            ? state.filters.price.filter(
                (price) => price.min !== action.payload.min
              )
            : [...state.filters.price, action.payload],
        },
      };
    }

    case "ADD_CATEGORIES_FROM_HOME":
      return {
        ...state,
        filters: { ...state.filters, categories: [action.payload] },
      };

    case "RESET":
      return { ...state, filters: { ...action.payload } };

    default:
      return state;
  }
};
