import { configureStore} from "@reduxjs/toolkit";
import {
  productReducers,
  productDetailReduces,
} from "../redux/reducers/productReducers";

export const store = configureStore({
  reducer: {
    productList: productReducers,
    productDetail: productDetailReduces,
  },
});
