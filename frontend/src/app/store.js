import { configureStore} from "@reduxjs/toolkit";
import { productReduces } from "../features/reducers/productReduces";

export const store = configureStore({
  reducer: {
    productList: productReduces,
  },
});
