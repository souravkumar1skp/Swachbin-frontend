import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./Slice/History";
import detailReducer from "./Slice/Details";
import pathReducer from "./Slice/path";

export const store = configureStore({
  reducer: {
    path: pathReducer,
    history: historyReducer,
    details: detailReducer,
  },
});
