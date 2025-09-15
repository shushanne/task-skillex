import { routes } from "./index";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Routes>
    </Suspense>
  );
}
