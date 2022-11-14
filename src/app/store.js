import { configureStore } from '@reduxjs/toolkit';
import calcReducer from '../features/calculator/calcSlice';

export const store = configureStore({
    reducer: {
        calculator: calcReducer,
    }
});