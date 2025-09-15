import { lazy } from "react";

const NotFound = lazy(() => import("../pages/NotFound"));
const ProductCatalog = lazy(() => import("../pages/ProductCatalog"));

const RouteNames = {
  DEFAULT: "*",
  PRODUCT_CATALOG: "/",
};

export const routes = [
  { path: RouteNames.DEFAULT, element: <NotFound /> },
  { path: RouteNames.PRODUCT_CATALOG, element: <ProductCatalog /> },
];
