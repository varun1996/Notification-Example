import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./screens/home";
import withNotification from "./hoc/withNotiifcation";

function App(props) {
  return <Home {...props} />;
}

export default withNotification()(App);
