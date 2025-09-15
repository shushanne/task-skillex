export const filterProducts = (products, filters) => {
  const { category, brand, rating, priceFrom, priceTo } = filters;

  const safePriceFrom = Number(priceFrom);
  const safePriceTo = Number(priceTo);
  const safeRating =
    rating !== undefined && rating !== "" ? Number(rating) : null;

  return products.filter((product) => {
    const matchesCategory =
      !category ||
      product.category.toLowerCase().includes(category.toLowerCase());

    const matchesBrand =
      !brand || product.brand.toLowerCase() === brand.toLowerCase();

    const matchesRating = safeRating === null || product.rating === safeRating;

    const matchesPrice =
      (isNaN(safePriceFrom) || product.price >= safePriceFrom) &&
      (isNaN(safePriceTo) || product.price <= safePriceTo);

    return matchesCategory && matchesBrand && matchesRating && matchesPrice;
  });
};

const compareBy =
  (key, order = "asc") =>
  (a, b) => {
    const result = a[key] - b[key];
    return order === "asc" ? result : -result;
  };

export const sortProducts = (products, filters) => {
  switch (filters.sort) {
    case "price-asc":
      return [...products].sort(compareBy("price", "asc"));
    case "price-desc":
      return [...products].sort(compareBy("price", "desc"));
    case "rating-asc":
      return [...products].sort(compareBy("rating", "asc"));
    case "rating-desc":
      return [...products].sort(compareBy("rating", "desc"));
    case "popularity-desc":
      return [...products].sort(compareBy("popularity", "desc"));
    default:
      return products;
  }
};

export function getPriceRange(products) {
  if (!products || products.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = products
    .map((p) => p.price)
    .filter((p) => typeof p === "number" && !isNaN(p));

  if (prices.length === 0) return { min: 0, max: 0 };

  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

export function paginateData(data, page, limit) {
  const startIndex = (page - 1) * limit;
  return data.slice(startIndex, startIndex + limit);
}
