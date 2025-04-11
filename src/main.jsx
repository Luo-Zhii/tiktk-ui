// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GlobalStyles from "./components/GlobalStyles/index.jsx";
import { Provider } from "react-redux";
import {store} from "../src/redux/store.tsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GlobalStyles>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalStyles>
  // </StrictMode>,
);
