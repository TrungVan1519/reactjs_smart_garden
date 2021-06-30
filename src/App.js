import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Main from "./components/main";
import History from './components/history';
import LoginForm from './components/loginForm';
import NotFound from './components/notFound';
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/history" exact component={History} />
          <Route
            path="/login"
            render={(routeProps) => (
              <LoginForm
                defaultUsername="admin"
                defaultPassword="123"
                {...routeProps}
              />
            )}
          />
          <Route path="/not-found" exact component={NotFound} />

          <Redirect from="/main" to="/" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
