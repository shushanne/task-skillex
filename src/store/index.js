import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import fetchSaga from "./saga/fetchProducts";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(fetchSaga);

export default store;
