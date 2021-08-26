import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Route exact path="/" component={Landing}></Route>
        <Container>
          <Route exact path="/dashboard" component={Home}></Route>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
          <Route exact path="/posts/:postId" component={SinglePost}></Route>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
