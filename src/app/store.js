import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import apiSlice from '../redux/feature/api/apiSlice'
import authSlice from '../redux/feature/auth/authSlice'

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
})