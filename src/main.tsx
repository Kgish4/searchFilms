import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { auth } from "./firebase/config";
import "./index.css";
import { Auth } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "react-query";

interface IContext {
  auth: Auth;
}
export const Context = createContext<IContext>({} as IContext);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ auth }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Context.Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
