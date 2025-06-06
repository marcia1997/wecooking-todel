import Topbar from "./components/topbar/TopBar";
import Homepage from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import axios from "axios";
import { useEffect, useContext } from "react";
import { Context } from "./context/Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const backendApiUrl = "https://wecooking-back.onrender.com";

function App() {
  const { user } = useContext(Context);

  useEffect(() => {
    axios.get(`${backendApiUrl}/api/posts`)
      .then(res => console.log("✅ Backend is working:", res.data))
      .catch(err => console.error("❌Error:", err));
  }, []);

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
        <Route path="/register">{user ? <Homepage /> : <Register />}</Route>
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
