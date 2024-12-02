import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={Store}>
      <Toaster />
      <App />
    </Provider>
  </BrowserRouter>
);
