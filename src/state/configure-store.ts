import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import globalReducer from './reducer';
import { projectReducer } from '../modules/project/state';
import { authReducer } from '../modules/auth/state/auth.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['projectReducer', 'authReducer'],
};

// Import and combine all the reducers here
const rootReducer = combineReducers({ globalReducer, projectReducer, authReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
export { persistor };
