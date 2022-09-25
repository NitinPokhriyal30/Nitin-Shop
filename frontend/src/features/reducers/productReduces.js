import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

const initialState = {
  products: [],
  loading: false,
  error: false,
};

export const productReduces = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [], error: false };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload, error: false };
    case PRODUCT_LIST_FAIL:
      return { loading: false, products: action.payload, error: true };
    default:
      return state;
  }
};
