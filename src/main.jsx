import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import GlobalConfig from "./contexts/GlobalConfig";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "react-auth-kit";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalConfig>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </GlobalConfig>
  </React.StrictMode>
);
