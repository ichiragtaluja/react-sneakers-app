export const getRatedProducts = (products, rating) =>
  rating
    ? products.filter(({ rating: ratings }) => rating <= ratings)
    : products;
