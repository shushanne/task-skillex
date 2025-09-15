import { call, put, takeEvery } from "redux-saga/effects";
import createBaseUrl from "../../api";
import {
  getProductsSuccess,
  getProductsFailure,
} from "../features/productsSlice";

const baseUrl = createBaseUrl(import.meta.env.VITE_REACT_APP_FETCH_PRODUCTS);

function* workFetchProducts() {
  try {
    const { data } = yield call(baseUrl.get, "/mock-data.json");
    const products = Array.isArray(data) ? data : [];
    yield put(
      getProductsSuccess({
        products,
      })
    );
  } catch (error) {
    yield put(getProductsFailure(error.message));
  }
}

function* fetchSaga() {
  yield takeEvery("products/fetchProducts", workFetchProducts);
}

export default fetchSaga;
