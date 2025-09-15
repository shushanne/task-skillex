import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setPage } from "../store/features/productsSlice";
import useDebounce from "../hooks/useDebounce";
import useDebouncedLoading from "../hooks/useDebounceLoading";
import useLocalStorage from "../hooks/useLocalStorage";
import useFieldChange from "../hooks/useFieldChange";

import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";
import SortBySelect from "../components/SortBySelect";
import Pagination from "../components/Pagination";

import {
  filterProducts,
  getPriceRange,
  sortProducts,
  paginateData,
} from "../utils/productUtils";
import { INITIAL_FILTERS_SORTS, SORT_OPTIONS } from "../config";

import MenuIcon from "../components/icons/MenuIcon";
import CloseIcon from "../components/icons/CloseIcon";

export default function ProductCatalog() {
  const dispatch = useDispatch();
  const { allProducts, loading, error, page, limit } = useSelector(
    (state) => state.products
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useLocalStorage(
    "filterandsort",
    INITIAL_FILTERS_SORTS
  );

  const priceRange = useMemo(() => getPriceRange(allProducts), [allProducts]);

  const filtersWithDefaults = useMemo(
    () => ({
      ...filters,
      priceFrom: filters.priceFrom || priceRange.min,
      priceTo: filters.priceTo || priceRange.max,
    }),
    [filters, priceRange]
  );

  const brandOptions = useMemo(
    () => [...new Set(allProducts.map((p) => p.brand))],
    [allProducts]
  );

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, filtersWithDefaults);
    return sortProducts(filtered, filtersWithDefaults);
  }, [allProducts, filtersWithDefaults]);

  const paginatedProducts = useMemo(
    () => paginateData(filteredAndSortedProducts, page, limit),
    [filteredAndSortedProducts, page, limit]
  );

  const debouncedFilters = useDebounce(filters, 700);
  const filterLoading = useDebouncedLoading(debouncedFilters, 300);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const lastFiltersRef = useRef(debouncedFilters);

  useEffect(() => {
    const filtersChanged =
      JSON.stringify(lastFiltersRef.current) !== JSON.stringify(filters);

    if (filtersChanged) {
      dispatch(setPage(1));
      lastFiltersRef.current = filters;
    }
  }, [filters, dispatch]);

  const handleFieldChange = useFieldChange(setFilters);

  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(setPage(newPage));
    },
    [dispatch]
  );

  const handleResetAll = useCallback(() => {
    setFilters({});
    dispatch(setPage(1));
  }, [dispatch, setFilters]);

  return (
    <main className="product-catalog">
      <button
        className="filter-toggle"
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        {isFilterOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <aside className={`filter-side ${isFilterOpen ? "open" : ""}`}>
        <FilterPanel
          filters={filtersWithDefaults}
          priceRange={priceRange}
          onChange={handleFieldChange}
          options={brandOptions}
        />
        <SortBySelect
          label="Sort by"
          field="sort"
          value={filters.sort}
          onChange={handleFieldChange}
          options={SORT_OPTIONS}
        />
        <button className="reset-btn" onClick={handleResetAll}>
          Reset All
        </button>
      </aside>

      <section className="product-list">
        {error && <div>{error}</div>}
        {(loading || filterLoading) && (
          <div className="message">
            <Loader />
          </div>
        )}
        {!loading &&
          !filterLoading &&
          filteredAndSortedProducts.length === 0 && (
            <div className="message">No products found.</div>
          )}
        <div className="grid-container">
          {!filterLoading &&
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {!loading && !filterLoading && filteredAndSortedProducts.length > 0 && (
          <Pagination
            currentPage={page}
            totalItems={filteredAndSortedProducts.length}
            itemsPerPage={limit}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  );
}
