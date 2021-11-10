import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import { watcherSaga } from "./sagas/rootSaga";

import userReducer from "./ducks/userDuck";

// Combining all the reducers
const reducer = combineReducers({
  user: userReducer,
});

/* Middlewares */
const sagaMiddleware = createSagaMiddleware();

// All the middlewares
const middlewares = [sagaMiddleware];

// Creating the redux store
// the second parameter is an enhancer. Since we dont have any thus {}
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

// Starting the Watcher Saga to listen redux actions
sagaMiddleware.run(watcherSaga);
export default store;
