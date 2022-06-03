import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./html-movimentar/App";

ReactDOM.render(
  <React.StrictMode>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
      rel="stylesheet"
    ></link>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
