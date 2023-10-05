import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import loadingReducer from '../features/loading/loadingSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        loading:loadingReducer
    },
});

export default store;
