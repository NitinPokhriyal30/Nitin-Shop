import { configureStore} from "@reduxjs/toolkit";
import {
  productReduces,
  productDetailReduces,
} from "../redux/reducers/productReduces";

export const store = configureStore({
  reducer: {
    productList: productReduces,
    productDetail: productDetailReduces,
  },
});
