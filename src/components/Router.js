import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import A2750LM from "../Routes/A2750LM"
import A2750IO from "../Routes/A2750IO"

export default function MainRouter() {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={A2750LM} />
          <Route path="/IO/:id" component={A2750IO} />
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
}
