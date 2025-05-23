
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Login";
import SiparisSistemiUI from "./SiparisSistemiUI";

const App = () => (
  <>
    <Login />
    <SiparisSistemiUI />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
