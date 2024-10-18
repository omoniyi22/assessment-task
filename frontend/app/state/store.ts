import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import thunk from 'redux-thunk';
import userReducer from "@/app/state/user/userSlice"
import alertReducer from "@/app/state/alert/alertSlice"
import titleReducer from "@/app/state/title/titleSlice"



export const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertReducer,
        title: titleReducer
    }
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
