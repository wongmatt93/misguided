import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContextProvider from "./context/AuthContextProvider";
import "./index.css";
import CityContextProvider from "./context/CityContextProvider";
import TripContextProvider from "./context/TripContextProvider";
import ExplorerContextProvider from "./context/ExplorerContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CityContextProvider>
        <ExplorerContextProvider>
          <TripContextProvider>
            <App />
          </TripContextProvider>
        </ExplorerContextProvider>
      </CityContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
