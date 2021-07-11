import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistCellsMiddleware } from "./middlewares/persist-cells-middleware";
import reducers from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middleware = [persistCellsMiddleware, thunk];

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__<any>({
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const store = createStore(reducers, {}, enhancer);

export default store;
