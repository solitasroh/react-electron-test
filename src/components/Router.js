import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
export default function MainRouter() {
  return (
    <Router>
      <>
        <Header />
      </>
    </Router>
  );
}
