export const getSearchedProducts = (products, input) =>
  input
    ? products.filter(({ name }) =>
        name.toLowerCase().includes(input.toLowerCase())
      )
    : products;
