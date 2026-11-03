"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Toaster } from 'sonner';

import { persistor, store } from "@/store";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toaster richColors />
      {/* <PersistGate loading={null} persistor={persistor}> */}
        {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
