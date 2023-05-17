export const getPricedProducts = (products, price) =>
  price.length
    ? products.filter(({ discounted_price }) =>
        price.some(
          (amount) =>
            discounted_price >= amount.min && discounted_price <= amount.max
        )
      )
    : products;
