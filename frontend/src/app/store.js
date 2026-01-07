import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import userReducer from "./services/userSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})