import { combineReducers } from "redux";
import { getProductsReducers } from "./Productsreducers"; // Make sure the file path is correct

const rootreducers = combineReducers({
    getproductsdata: getProductsReducers,
    // You can add more reducers here as your app grows
});

export default rootreducers;
