export const INITIAL_FILTERS_SORTS = {
  category: "",
  brand: "",
  rating: "",
  priceFrom: 0,
  priceTo: 0,
  sort: "",
};

export const SORT_OPTIONS = [
  { value: "", label: "No sorting" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-asc", label: "Rating: Lowest Rated" },
  { value: "rating-desc", label: "Rating: Top Rated" },
  { value: "popularity-desc", label: "Most popular" },
];
