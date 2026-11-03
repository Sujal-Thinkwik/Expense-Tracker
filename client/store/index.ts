import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { appReducer } from '@/store/app/app.reducer';
import { setupListeners } from '@reduxjs/toolkit/query';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { apiService } from '@/services/api.service';

declare global {
  interface ImportMetaEnv {
    readonly VITE_PERSIST_KEY?: string;
    readonly PERSIST_KEY?: string;
    readonly NEXT_PUBLIC_API_BASE_URL?: string;
  }
}

const persistKey =
  import.meta.env.VITE_PERSIST_KEY ??
  import.meta.env.PERSIST_KEY ??
  'development_fallback_key';

const persistConfig = {
  keyPrefix: 'pro:',
  key: 'pro',
  storage: storage,
  stateReconciler: hardSet,
  whitelist: ['auth', 'config'],
  debug: import.meta.env.MODE === 'development',
  transforms: [
    encryptTransform({
      secretKey: persistKey,
      onError: function (error) {
        console.log('Critical Error Transforming Encrypted Data ==>', error);
      }
    })
  ]
};

export const store = configureStore({
  devTools: import.meta.env.MODE === 'development',
  reducer: {
    app: persistReducer<AppState>(persistConfig, appReducer),
    [apiService.reducerPath]: apiService.reducer
  },
  middleware: gdm =>
    gdm({
      serializableCheck: false
    }).concat(apiService.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof appReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
