import Topbar from "./components/topbar/TopBar";
import Homepage from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useContext } from "react";
import { Context } from "./context/Context"
//I take from reactrouter
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

function App() {

  const {user} = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register"> {user ? <Homepage /> : <Register />}</Route>
        <Route path="/login">{user ? <Homepage /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;