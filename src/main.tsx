import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import store from "./app/store";
import "./index.css";
import "./i18n";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New version available! Click OK to update.")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline!");
    // Optional: Show a subtle notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Destination Bir", {
        body: "App is ready to work offline!",
        icon: "/favicon-96x96.png",
      });
    }
  },
});

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );
}
