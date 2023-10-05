import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RootStoreContext } from "./root-store-context";
import RootStore from "./stores/root-stote";
import "./utils/axios-global";
import { QueryClientProvider, QueryClient } from "react-query";

export const appQueryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={appQueryClient}>
      <RootStoreContext.Provider value={new RootStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RootStoreContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
