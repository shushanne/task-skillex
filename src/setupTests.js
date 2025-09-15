import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

vi.mock("./hooks/useDebounce", () => ({
  default: (value) => value,
}));

vi.mock("./hooks/useDebounceLoading", () => ({
  default: () => false,
}));

vi.mock("../hooks/useLocalStorage", () => ({
  default: () => [
    {
      category: "",
      brand: "",
      rating: "",
      priceFrom: 0,
      priceTo: 1000,
      sort: "",
    },
    vi.fn(),
  ],
}));
