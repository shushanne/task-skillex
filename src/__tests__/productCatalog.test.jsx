import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductCatalog from "../pages/ProductCatalog";
import productsReducer from "../store/features/productsSlice";

const mockProducts = [
  {
    id: 1,
    name: "Smartphone",
    category: "Electronics",
    brand: "Brand A",
    rating: 4.5,
    price: 500,
    imageUrl: "example.jpg",
    popularity: 20,
  },
  {
    id: 2,
    name: "Leather Jacket",
    category: "Clothing",
    brand: "Brand B",
    rating: 4,
    price: 100,
    imageUrl: "example.jpg",
    popularity: 50,
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Footwear",
    brand: "Brand C",
    rating: 3.5,
    price: 300,
    imageUrl: "example.jpg",
    popularity: 10,
  },
];

const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { products: productsReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <ProductCatalog />
    </Provider>
  );
};

describe("ProductCatalog Filtering and Sorting Tests", () => {
  const preloadedState = {
    products: {
      allProducts: mockProducts,
      products: mockProducts,
      loading: false,
      error: null,
      page: 1,
      limit: 10,
      total: mockProducts.length,
    },
  };

  it("renders all products initially", () => {
    renderWithStore(preloadedState);

    mockProducts.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });

  it("filters by category", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByTestId("filter-category"), {
      target: { value: "Clothing" },
    });

    expect(screen.getByText("Leather Jacket")).toBeInTheDocument();
    expect(screen.queryByText("Smartphone")).not.toBeInTheDocument();
    expect(screen.queryByText("Running Shoes")).not.toBeInTheDocument();
  });

  it("filters by brand", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByTestId("filter-brand"), {
      target: { value: "Brand C" },
    });

    waitFor(() => {
      expect(screen.findByText("Running Shoes")).toBeInTheDocument();
    });
    expect(screen.queryByText("Smartphone")).not.toBeInTheDocument();
    expect(screen.queryByText("Leather Jacket")).not.toBeInTheDocument();
  });

  it("filters by rating", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByTestId("filter-rating"), {
      target: { value: 4 },
    });

    waitFor(() => {
      expect(screen.getByText("Smartphone")).toBeInTheDocument();
      expect(screen.getByText("Leather Jacket")).toBeInTheDocument();
    });
    expect(screen.queryByText("Running Shoes")).not.toBeInTheDocument();
  });

  it("filters by price range", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByTestId("price-range"), {
      target: { value: 200 },
    });

    waitFor(() => {
      expect(screen.getByText("Smartphone")).toBeInTheDocument();
      expect(screen.getByText("Running Shoes")).toBeInTheDocument();
    });
    expect(screen.queryByText("Leather Jacket")).not.toBeInTheDocument();
  });

  it("updates in real-time when multiple filters change", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByTestId("filter-category"), {
      target: { value: "Clothing" },
    });
    fireEvent.change(screen.getByTestId("filter-brand"), {
      target: { value: "Brand B" },
    });

    expect(screen.getByText("Leather Jacket")).toBeInTheDocument();
    expect(screen.queryByText("Smartphone")).not.toBeInTheDocument();
    expect(screen.queryByText("Running Shoes")).not.toBeInTheDocument();
  });

  it("shows 'No products found' when filters match nothing", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByTestId("filter-category"), {
      target: { value: "Toys" },
    });

    waitFor(() => {
      expect(screen.getByText("No products found.")).toBeInTheDocument();
    });
  });

  it("sorts by rating descending", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByLabelText(/Sort by/i), {
      target: { value: "rating-asc" },
    });

    waitFor(() => {
      const ratings = screen
        .getAllByTestId("product-rating")
        .map((el) => el.textContent);
      expect(ratings).toEqual([
        "Rating: 3.5 / 5",
        "Rating: 4 / 5",
        "Rating: 4.5 / 5",
      ]);
    });
  });

  it("sorts by rating ascending", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByLabelText(/Sort by/i), {
      target: { value: "rating-asc" },
    });

    waitFor(() => {
      const ratings = screen
        .getAllByTestId("product-rating")
        .map((el) => el.textContent);
      expect(ratings).toEqual([
        "Rating: 3.5 / 5",
        "Rating: 4 / 5",
        "Rating: 4.5 / 5",
      ]);
    });
  });

  it("sorts by price ascending", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByLabelText(/Sort by/i), {
      target: { value: "price-asc" },
    });

    waitFor(() => {
      const prices = screen
        .getAllByTestId("product-price")
        .map((el) => el.textContent);
      expect(prices).toEqual(["Price: $100", "Price: $300", "Price: $500"]);
    });
  });

  it("sorts by price descending", () => {
    renderWithStore(preloadedState);

    fireEvent.change(screen.getByLabelText(/Sort by/i), {
      target: { value: "price-desc" },
    });

    waitFor(() => {
      const prices = screen
        .getAllByTestId("product-price")
        .map((el) => el.textContent);
      expect(prices).toEqual(["Price: $500", "Price: $300", "Price: $100"]);
    });
  });
});
