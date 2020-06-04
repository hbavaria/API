// https://medium.com/@resir014/a-type-safe-approach-to-redux-stores-in-typescript-6474e012b81e
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./index";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  if (process.env.NODE_ENV === "development") {
    // Add support for Redux development tools
    const composeEnhancers = composeWithDevTools({});
    return createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    );
  } else {
    return createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, reduxImmutableStateInvariant())
    );
  }
}
