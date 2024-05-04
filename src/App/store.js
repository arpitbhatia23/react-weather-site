import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataslice";
export const store = configureStore({
    reducer: dataReducer
})