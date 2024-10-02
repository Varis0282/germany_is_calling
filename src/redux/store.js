import { loader } from "./loaderReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    loaders: loader.reducer
  },
});

export default store;