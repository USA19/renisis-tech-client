import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { AuthProvider } from "./Context";

ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
  document.getElementById("root")
);
