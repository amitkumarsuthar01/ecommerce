import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // ✅ fixed named import
import { composeWithDevTools } from "@redux-devtools/extension";
import rootreducers from "./components/redux/reducers/main";

const middleware = [thunk];

const store = createStore(
  rootreducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
