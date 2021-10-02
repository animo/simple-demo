import { Invitation } from "./components/Invitation";
import { Credential } from "./components/Credential";
import { Home } from "./components/Home";
import { Proof } from "./components/Proof";
// Router
import { Switch, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/invitation" exact>
          <Invitation />
        </Route>
        <Route path="/credential" exact>
          <Credential />
        </Route>
        <Route path="/proof" exact>
          <Proof />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
