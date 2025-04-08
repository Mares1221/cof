import { IGeneral } from "@/interfaces/general";
import { Auth } from "@/models/auth";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "../utils/storage";
import { authReducer } from "./auth-slice";
import { generalReducer } from "./general-slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

export interface RootState {
  auth: Auth;
  general: IGeneral;
}

const rootReducer = combineReducers({
  auth: authReducer,
  general: generalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

persistStore(store);

export { store };
