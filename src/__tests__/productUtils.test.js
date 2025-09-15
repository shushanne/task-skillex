import { describe, it, expect } from "vitest";
import {
  filterProducts,
  sortProducts,
  getPriceRange,
} from "../utils/productUtils";

const mockProducts = [
  {
    id: 1,
    category: "Electronics",
    brand: "Brand A",
    rating: 4.5,
    price: 500,
    popularity: 20,
  },
  {
    id: 2,
    category: "Clothing",
    brand: "Brand B",
    rating: 4.0,
    price: 100,
    popularity: 50,
  },
  {
    id: 3,
    category: "Footwear",
    brand: "Brand C",
    rating: 3.5,
    price: 300,
    popularity: 10,
  },
];

describe("filterProducts", () => {
  it("filters by category", () => {
    const result = filterProducts(mockProducts, { category: "Clothing" });
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("Clothing");
  });

  it("filters by brand", () => {
    const result = filterProducts(mockProducts, { brand: "Brand C" });
    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe("Brand C");
  });

  it("filters by rating", () => {
    const result = filterProducts(mockProducts, { rating: 4.5 });
    expect(result).toHaveLength(1);
    expect(result[0].rating).toBe(4.5);
  });

  it("filters by price range", () => {
    const result = filterProducts(mockProducts, {
      priceFrom: 200,
      priceTo: 400,
    });
    expect(result).toEqual([mockProducts[2]]);
  });

  it("returns empty array if no match", () => {
    const result = filterProducts(mockProducts, { category: "Toys" });
    expect(result).toHaveLength(0);
  });
});

describe("sortProducts", () => {
  it("sorts by price ascending", () => {
    const result = sortProducts(mockProducts, { sort: "price-asc" });
    expect(result.map((p) => p.price)).toEqual([100, 300, 500]);
  });

  it("sorts by price descending", () => {
    const result = sortProducts(mockProducts, { sort: "price-desc" });
    expect(result.map((p) => p.price)).toEqual([500, 300, 100]);
  });

  it("sorts by rating ascending", () => {
    const result = sortProducts(mockProducts, { sort: "rating-asc" });
    expect(result.map((p) => p.rating)).toEqual([3.5, 4.0, 4.5]);
  });

  it("sorts by rating descending", () => {
    const result = sortProducts(mockProducts, { sort: "rating-desc" });
    expect(result.map((p) => p.rating)).toEqual([4.5, 4.0, 3.5]);
  });

  it("sorts by popularity descending", () => {
    const result = sortProducts(mockProducts, { sort: "popularity-desc" });
    expect(result.map((p) => p.popularity)).toEqual([50, 20, 10]);
  });

  it("returns original list if no sort is selected", () => {
    const result = sortProducts(mockProducts, { sort: "" });
    expect(result).toEqual(mockProducts);
  });
});

describe("getPriceRange", () => {
  it("returns correct min and max", () => {
    const result = getPriceRange(mockProducts);
    expect(result).toEqual({ min: 100, max: 500 });
  });

  it("returns 0,0 for empty array", () => {
    expect(getPriceRange([])).toEqual({ min: 0, max: 0 });
  });
});
