// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./user_reducer";

// export const store = configureStore({
//   reducer: userReducer
// });

import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user_reducer";
import profileReducer from "./profile_reducer";

const reducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
});

const middlewares = [thunk];

export const store = createStore(reducers, applyMiddleware(...middlewares));
