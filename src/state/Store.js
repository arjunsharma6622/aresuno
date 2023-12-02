import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import businessReducer from "./slices/businessSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import categoriesReducer from "./slices/categoriesSlice"
import bannerReducer from "./slices/bannerSlice"


const rootReducer = combineReducers({
    user: userReducer,
    business: businessReducer,
    categories: categoriesReducer,
    banner : bannerReducer
})

const persistConfig = {
    key: 'root',
    storage
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
        
    })
})

const persistor = persistStore(store)

export { store, persistor }