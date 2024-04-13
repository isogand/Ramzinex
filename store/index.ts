import {combineReducers, configureStore} from "@reduxjs/toolkit";
import themeReducer from "./ThemeSlice";
import predictReducer from './PredictSlice';
import authReducer from './AuthSlice';
import statusReducer from './StatusSlice ';
import profileReducer from './ProfileSlice';
import editProfileReducer from './EditProfileSlice';
import versionReducer from "./VersionControlSlice";
import ticketInfoReducer from "./TicketInfoSlice";
import PassengerInfoReducer from "./PassengerInfoSlice";
import cartReducer from "./cartInfo";
import productReducer from "./ProductSlice";

import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key:'root',
    storage: AsyncStorage,
    whitelist:['themeReducer', 'predictReducer','authReducer','statusReducer','profileReducer','quizReducer','editProfileReducer', 'versionReducer','ticketInfoReducer','cartReducer','productReducer'],
    blacklist:['PassengerInfoReducer']
}

const rootReducer = combineReducers({
    themeReducer,
    predictReducer,
    authReducer,
    statusReducer,
    profileReducer,
    editProfileReducer,
    versionReducer,
    ticketInfoReducer,
    PassengerInfoReducer,
    cartReducer,
    productReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export const persistor = persistStore(store);
