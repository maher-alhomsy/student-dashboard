import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./context/user-provider.tsx";
// import './index.css'

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
