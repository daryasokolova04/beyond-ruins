import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login/login";
import SuccessPage from "./components/successPage";
import Posts from "./components/posts";
import EditPost from "./components/editPost";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/login/:type?" component={Login} />
        <Route path="/home/:id?/:action?" component={Home} />
        <Route path="/edit/:postId?" component={EditPost} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/posts/:postId?" component={Posts} />
        <Redirect to="/loading" />
      </Switch>
    </div>
  );
}

export default App;
