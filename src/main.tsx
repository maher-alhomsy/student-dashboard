import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { UserContextProvider } from "./context/user-provider.tsx";
import { LanguageContextProvider } from "./context/language-provider.tsx";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <LanguageContextProvider>
        <App />
      </LanguageContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
