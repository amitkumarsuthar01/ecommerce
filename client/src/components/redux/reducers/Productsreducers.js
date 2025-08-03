const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const getProductsReducers = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_GET_PRODUCTS":
      return {
        ...state,
        loading: true,
      };

    case "SUCCESS_GET_PRODUCTS":
      return {
        loading: false,
        products: action.payload,
        error: null,
      };

    case "FAIL_GET_PRODUCTS":
      return {
        loading: false,
        products: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
